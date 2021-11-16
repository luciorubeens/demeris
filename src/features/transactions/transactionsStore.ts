import { defineStore } from 'pinia';
import { interpret } from 'xstate';

import { store as globalStore } from '@/store';
import { hashObject } from '@/utils/basic';

import {
  TransactionProcessContext,
  transactionProcessMachine,
  TransactionProcessService,
} from './transactionProcessMachine';
import { getCurrentTransaction, getSourceChainFromTransaction } from './transactionProcessSelectors';

type State = {
  transactions: Record<string, TransactionProcessService>;
  pending: Record<string, TransactionProcessService>;
  isBottomSheetMinimized: boolean;
};

export const useTransactionsStore = defineStore('transactions', {
  state: () =>
    ({
      transactions: {},
      pending: {},
      isBottomSheetMinimized: false,
    } as State),

  getters: {
    isPending: (state) => (stepHash: string) => stepHash in state.pending,
  },

  actions: {
    toggleBottomSheet() {
      this.isBottomSheetMinimized = !this.isBottomSheetMinimized;
    },

    removePendingTransaction(stepHash: string) {
      delete this.pending[stepHash];
    },

    findOrCreateTransactionMachine(action: string, steps: any[]): [string, any] {
      const stepHash = hashObject(steps);
      const pendingTransactions = this.pending;

      if (stepHash in this.transactions) {
        return [stepHash, this.transactions[stepHash]];
      }

      const service = interpret(
        transactionProcessMachine.withConfig({
          services: {
            async validatePreviousTransaction(context: TransactionProcessContext) {
              const currentTransaction = getCurrentTransaction(context);
              const currentSourceChain = getSourceChainFromTransaction(currentTransaction);

              const hasPendingInChain = Object.values(pendingTransactions).some((item: TransactionProcessService) => {
                const snapshot = item.getSnapshot();
                const itemTransaction = getCurrentTransaction(snapshot.context);
                const itemSourceChain = getSourceChainFromTransaction(itemTransaction);

                if (itemSourceChain === currentSourceChain && !snapshot.done) {
                  return true;
                }

                return false;
              });

              if (hasPendingInChain) {
                throw new Error(`Pending transaction in ${currentSourceChain}.`);
              }

              return Promise.resolve(true);
            },
          },
        }),
        { devTools: true },
      );

      service.start();
      service.send({
        type: 'SET_DATA',
        action,
        steps,
        gasPriceLevel: globalStore.getters['demeris/getPreferredGasPriceLevel'],
        gasLimit: globalStore.getters['demeris/getGasLimit'],
      });

      service.subscribe((state) => {
        // Add transaction to the floating widget list
        if (state.matches('transacting') || state.matches('waitingPreviousTransaction')) {
          if (!(stepHash in this.pending)) {
            this.pending = {
              [stepHash]: service,
              ...this.pending,
            };
          }
        }

        // Notify all waiting services when this completes
        if (state.done) {
          Object.values(this.pending).forEach((itemService: TransactionProcessService) => {
            if (itemService.state.matches('waitingPreviousTransaction')) {
              itemService.send('CONTINUE');
            }
          });
        }
      });

      this.transactions[stepHash] = service;

      return [stepHash, service];
    },
  },
});
