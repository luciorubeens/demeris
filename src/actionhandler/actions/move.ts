import { EmerisBase } from '@emeris/types';

import { GlobalActionTypes, GlobalGetterTypes, RootStoreTyped } from '@/store';
import { getBaseDenom, getFeeForChain } from '@/utils/actionHandler';
import { generateDenomHash, getChannel, isNative } from '@/utils/basic';
import { useStore } from '@/utils/useStore';

export async function move({
  amount,
  chain_name,
  destination_chain_name,
}: {
  amount: EmerisBase.Amount;
  chain_name: string;
  destination_chain_name: string;
}) {
  const typedstore = useStore() as RootStoreTyped;
  const result = {
    steps: [],
    output: {
      denom: '',
      amount: '0',
      chain_name: '',
    },
    mustAddFee: false,
  };
  if (isNative(amount.denom)) {
    // If NOT an IBC denom
    if (chain_name == destination_chain_name) {
      result.output = { amount: amount.amount, denom: amount.denom, chain_name };
      return result;
    } else {
      if (typedstore.getters[GlobalGetterTypes.API.isVerified]({ denom: amount.denom, chain_name })) {
        // If verified denom on a different chain, ibc_forward through primary channel to the destination_chain_name
        const primaryChannel = typedstore.getters[GlobalGetterTypes.API.getPrimaryChannel]({
          chain_name: chain_name,
          destination_chain_name: destination_chain_name,
        });

        result.steps.push({
          name: 'ibc_forward',
          status: 'pending',
          data: {
            amount: amount,
            from_chain: chain_name,
            chain_fee: await getFeeForChain(chain_name),
            to_chain: destination_chain_name,
            through: primaryChannel,
          },
        });

        const invPrimaryChannel = typedstore.getters[GlobalGetterTypes.API.getPrimaryChannel]({
          chain_name: destination_chain_name,
          destination_chain_name: chain_name,
        });
        result.output = {
          amount: amount.amount,
          denom: generateDenomHash(invPrimaryChannel, amount.denom),
          chain_name: destination_chain_name,
        };
        return result;
      }
    }
  }
  let verifyTrace;
  try {
    verifyTrace =
      typedstore.getters[GlobalGetterTypes.API.getVerifyTrace]({ chain_name, hash: amount.denom.split('/')[1] }) ??
      (await typedstore.dispatch(
        GlobalActionTypes.API.GET_VERIFY_TRACE,
        { subscribe: false, params: { chain_name, hash: amount.denom.split('/')[1] } },
        { root: true },
      ));
  } catch (e) {
    //  If we cannot verify the trace, throw error
    throw new Error('Trace not verified');
  }
  if (verifyTrace.trace.length == 1 && chain_name == destination_chain_name) {
    const primaryChannel = typedstore.getters[GlobalGetterTypes.API.getPrimaryChannel]({
      chain_name: chain_name,
      destination_chain_name: verifyTrace.trace[0].counterparty_name,
    });
    if (primaryChannel == getChannel(verifyTrace.path, 0)) {
      result.output = { amount: amount.amount, denom: amount.denom, chain_name };
      return result;
    } else {
      result.steps.push({
        name: 'ibc_backward',
        status: 'pending',
        addFee: true,
        feeToAdd: await getFeeForChain(verifyTrace.trace[0].counterparty_name),
        data: {
          amount: amount,
          from_chain: chain_name,
          base_denom: await getBaseDenom(amount.denom, chain_name),
          to_chain: verifyTrace.trace[0].counterparty_name,
          through: verifyTrace.trace[0].channel,
        },
      });
      result.mustAddFee = true;
      result.steps.push({
        name: 'ibc_forward',
        status: 'pending',
        data: {
          amount: { amount: amount.amount, denom: verifyTrace.base_denom },
          from_chain: verifyTrace.trace[0].counterparty_name,
          chain_fee: await getFeeForChain(verifyTrace.trace[0].counterparty_name),
          to_chain: destination_chain_name,
          through: primaryChannel,
        },
      });

      const invPrimaryChannel = typedstore.getters[GlobalGetterTypes.API.getPrimaryChannel]({
        chain_name: destination_chain_name,
        destination_chain_name: chain_name,
      });

      result.output = {
        amount: amount.amount,
        denom: generateDenomHash(invPrimaryChannel, verifyTrace.base_denom),
        chain_name: destination_chain_name,
      };
      return result;
    }
  } else {
    if (verifyTrace.trace.length > 1) {
      // If trace is longer than 1-hop, throw error because user must redeem the denom first (should never reach this part of the code
      // as the UI should not allow selection of such a token but leaving it here for consistency)
      throw new Error('Denom must be redeemed first');
    } else {
      if (verifyTrace.trace[0].counterparty_name !== destination_chain_name) {
        result.mustAddFee = true;
        result.steps.push({
          name: 'ibc_backward',
          status: 'pending',
          addFee: true,
          feeToAdd: await getFeeForChain(verifyTrace.trace[0].counterparty_name),
          data: {
            amount: amount,
            from_chain: chain_name,
            base_denom: await getBaseDenom(amount.denom, chain_name),
            to_chain: verifyTrace.trace[0].counterparty_name,
            through: verifyTrace.trace[0].channel,
          },
        });
        const primaryChannel = typedstore.getters[GlobalGetterTypes.API.getPrimaryChannel]({
          chain_name: verifyTrace.trace[0].counterparty_name,
          destination_chain_name: destination_chain_name,
        });
        result.steps.push({
          name: 'ibc_forward',
          status: 'pending',
          data: {
            amount: { amount: amount.amount, denom: verifyTrace.base_denom },
            from_chain: verifyTrace.trace[0].counterparty_name,
            chain_fee: await getFeeForChain(verifyTrace.trace[0].counterparty_name),
            to_chain: destination_chain_name,
            through: primaryChannel,
          },
        });

        const invPrimaryChannel = typedstore.getters[GlobalGetterTypes.API.getPrimaryChannel]({
          chain_name: destination_chain_name,
          destination_chain_name: verifyTrace.trace[0].counterparty_name,
        });
        result.output = {
          amount: amount.amount,
          denom: generateDenomHash(invPrimaryChannel, verifyTrace.base_denom),
          chain_name: destination_chain_name,
        };
      } else {
        result.steps.push({
          name: 'ibc_backward',
          status: 'pending',
          data: {
            amount: amount,
            from_chain: chain_name,
            base_denom: await getBaseDenom(amount.denom, chain_name),
            to_chain: verifyTrace.trace[0].counterparty_name,
            through: verifyTrace.trace[0].channel,
          },
        });
        result.output = {
          amount: amount.amount,
          denom: verifyTrace.base_denom,
          chain_name: destination_chain_name,
        };
      }
      return result;
    }
  }
}
