import { ActionTree, ActionContext } from 'vuex';
import * as API from '@/types/api';
import { RootState } from '@/store';
import { SpVuexError } from '@starport/vuex';
import { State } from './state';
import { DemerisActionTypes, DemerisActionParams, DemerisSubscriptions } from './action-types';
import { DemerisMutationTypes } from './mutation-types';
import axios from 'axios';
export interface Actions {
  // Cross-chain endpoint actions
  [DemerisActionTypes.GET_BALANCES](
    { commit, getters }: ActionContext<State, RootState>,
    { subscribe, params }: DemerisActionParams,
  ): Promise<API.Balances>;
  [DemerisActionTypes.GET_STAKING_BALANCES](
    { commit, getters }: ActionContext<State, RootState>,
    { subscribe, params }: DemerisActionParams,
  ): Promise<API.StakingBalances>;
  [DemerisActionTypes.GET_VERIFIED_DENOMS](
    { commit, getters }: ActionContext<State, RootState>,
    { subscribe }: DemerisActionParams,
  ): Promise<API.VerifiedDenoms>;
  [DemerisActionTypes.GET_FEE_ADDRESSES](
    { commit, getters }: ActionContext<State, RootState>,
    { subscribe, params }: DemerisActionParams,
  ): Promise<API.FeeAddresses>;
  [DemerisActionTypes.GET_CHAINS](
    { commit, getters }: ActionContext<State, RootState>,
    { subscribe }: DemerisActionParams,
  ): Promise<API.Chains>;
  [DemerisActionTypes.GET_PRICES](
    { commit, getters }: ActionContext<State, RootState>,
    { subscribe }: DemerisActionParams,
  ): Promise<Array<any>>; //TODO

  // Chain-specific endpoint actions
  [DemerisActionTypes.GET_VERIFY_TRACE](
    { commit, getters }: ActionContext<State, RootState>,
    { subscribe, params }: DemerisActionParams,
  ): Promise<API.VerifyTrace>;
  [DemerisActionTypes.GET_FEE_ADDRESS](
    { commit, getters }: ActionContext<State, RootState>,
    { subscribe, params }: DemerisActionParams,
  ): Promise<API.FeeAddress>;
  [DemerisActionTypes.GET_FEE](
    { commit, getters }: ActionContext<State, RootState>,
    { subscribe, params }: DemerisActionParams,
  ): Promise<API.Fee>;
  [DemerisActionTypes.GET_FEE_TOKEN](
    { commit, getters }: ActionContext<State, RootState>,
    { subscribe, params }: DemerisActionParams,
  ): Promise<API.FeeTokens>;
  [DemerisActionTypes.GET_CHAIN](
    { commit, getters }: ActionContext<State, RootState>,
    { subscribe }: DemerisActionParams,
  ): Promise<API.Chain>;
  [DemerisActionTypes.GET_PRIMARY_CHANNEL](
    { commit, getters }: ActionContext<State, RootState>,
    { subscribe, params }: DemerisActionParams,
  ): Promise<API.PrimaryChannel>;
  [DemerisActionTypes.GET_PRIMARY_CHANNELS](
    { commit, getters }: ActionContext<State, RootState>,
    { subscribe, params }: DemerisActionParams,
  ): Promise<API.PrimaryChannels>;
  [DemerisActionTypes.GET_CHAIN_STATUS](
    { commit, getters }: ActionContext<State, RootState>,
    { subscribe, params }: DemerisActionParams,
  ): Promise<any>; //TODO

  // Internal module actions

  [DemerisActionTypes.INIT]({ dispatch, rootGetters }: ActionContext<State, RootState>): void;
  [DemerisActionTypes.RESET_STATE]({ commit }: ActionContext<State, RootState>): void;
  [DemerisActionTypes.UNSUBSCRIBE](
    { commit }: ActionContext<State, RootState>,
    subscription: DemerisSubscriptions,
  ): void;
  [DemerisActionTypes.STORE_UPDATE]({ state, dispatch }: ActionContext<State, RootState>): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  // Cross-chain endpoint actions

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async [DemerisActionTypes.GET_BALANCES]({ commit, getters }, { subscribe = false, params }) {
    try {
      const response = await axios.get('/balances/' + (params as API.AddrReq).address);
      commit(DemerisMutationTypes.SET_BALANCES, { params, value: response.data.balances });
      if (subscribe) {
        commit('SUBSCRIBE', { action: DemerisActionTypes.GET_BALANCES, payload: { params } });
      }
    } catch (e) {
      throw new SpVuexError('Demeris:GetBalances', 'Could not perform API query.');
    }
    return getters['getBalances'](JSON.stringify(params));
  },
  async [DemerisActionTypes.GET_STAKING_BALANCES]({ commit, getters }, { subscribe = false, params }) {
    try {
      const response = await axios.get('/staking_balances/' + (params as API.AddrReq).address);
      commit(DemerisMutationTypes.SET_STAKING_BALANCES, { params, value: response.data.staking_balances });
      if (subscribe) {
        commit('SUBSCRIBE', { action: DemerisActionTypes.GET_STAKING_BALANCES, payload: { params } });
      }
    } catch (e) {
      throw new SpVuexError('Demeris:GetStakingBalances', 'Could not perform API query.');
    }
    return getters['getStakingBalances'](JSON.stringify(params));
  },
  async [DemerisActionTypes.GET_VERIFIED_DENOMS]({ commit, getters }, { subscribe = false }) {
    try {
      const response = await axios.get('/verified_denoms');
      commit(DemerisMutationTypes.SET_VERIFIED_DENOMS, { value: response.data.verified_denoms });
      if (subscribe) {
        commit('SUBSCRIBE', { action: DemerisActionTypes.GET_VERIFIED_DENOMS, payload: {} });
      }
    } catch (e) {
      throw new SpVuexError('Demeris:GetVerifiedDenoms', 'Could not perform API query.');
    }
    return getters['getVerifiedDenoms'];
  },
  async [DemerisActionTypes.GET_FEE_ADDRESSES]({ commit, getters }, { subscribe = false, params }) {
    try {
      const response = await axios.get('/chain/' + (params as API.ChainReq).chain_name + '/fee/address');
      commit(DemerisMutationTypes.SET_FEE_ADDRESSES, { params, value: response.data.fee_addresses });
      if (subscribe) {
        commit('SUBSCRIBE', { action: DemerisActionTypes.GET_FEE_ADDRESSES, payload: { params } });
      }
    } catch (e) {
      throw new SpVuexError('Demeris:GetFeeAddresses', 'Could not perform API query.');
    }
    return getters['getFeeAddresses'](JSON.stringify(params));
  },
  // TODO Prices query
  async [DemerisActionTypes.GET_PRICES]({ commit, getters }, { subscribe = false }) {
    try {
      const response = await axios.get('/prices');
      commit(DemerisMutationTypes.SET_PRICES, { value: response.data.prices });
      if (subscribe) {
        commit('SUBSCRIBE', { action: DemerisActionTypes.GET_PRICES, payload: {} });
      }
    } catch (e) {
      throw new SpVuexError('Demeris:GetPrices', 'Could not perform API query.');
    }
    return getters['getPrices'];
  },
  async [DemerisActionTypes.GET_CHAINS]({ commit, getters }, { subscribe = false }) {
    try {
      const response = await axios.get('/chains');
      commit(DemerisMutationTypes.SET_CHAINS, { value: response.data.chains });
      if (subscribe) {
        commit('SUBSCRIBE', { action: DemerisActionTypes.GET_CHAINS, payload: {} });
      }
    } catch (e) {
      throw new SpVuexError('Demeris:GetChains', 'Could not perform API query.');
    }
    return getters['getChains'];
  },

  // Chain-specific endpoint actions

  async [DemerisActionTypes.GET_VERIFY_TRACE]({ commit, getters }, { subscribe = false, params }) {
    try {
      const response = await axios.get(
        '/chain/' +
          (params as API.VerifyTraceReq).chain_name +
          '/denom/verify_trace/' +
          (params as API.VerifyTraceReq).hash,
      );
      commit(DemerisMutationTypes.SET_VERIFY_TRACE, { params, value: response.data.verify_trace });
      if (subscribe) {
        commit('SUBSCRIBE', { action: DemerisActionTypes.GET_VERIFY_TRACE, payload: { params } });
      }
    } catch (e) {
      throw new SpVuexError('Demeris:GetVerifiedPath', 'Could not perform API query.');
    }
    return getters['getVerifyTrace'](JSON.stringify(params));
  },
  async [DemerisActionTypes.GET_FEE_ADDRESS]({ commit, getters }, { subscribe = false, params }) {
    try {
      const response = await axios.get('/chain/' + (params as API.ChainReq).chain_name + '/fee/address');
      commit(DemerisMutationTypes.SET_FEE_ADDRESS, { params, value: response.data.fee_address });
      if (subscribe) {
        commit('SUBSCRIBE', { action: DemerisActionTypes.GET_FEE_ADDRESS, payload: { params } });
      }
    } catch (e) {
      throw new SpVuexError('Demeris:GetFeeAddress', 'Could not perform API query.');
    }
    return getters['getFeeAddress'](JSON.stringify(params));
  },
  async [DemerisActionTypes.GET_CHAIN]({ commit, getters }, { subscribe = false, params }) {
    try {
      const response = await axios.get('/chain/' + (params as API.ChainReq).chain_name);
      commit(DemerisMutationTypes.SET_FEE, { params, value: response.data.chain });
      if (subscribe) {
        commit('SUBSCRIBE', { action: DemerisActionTypes.GET_FEE, payload: { params } });
      }
    } catch (e) {
      throw new SpVuexError('Demeris:GetChain', 'Could not perform API query.');
    }
    return getters['getFee'](JSON.stringify(params));
  },
  async [DemerisActionTypes.GET_FEE]({ commit, getters }, { subscribe = false, params }) {
    try {
      const response = await axios.get('/chain/' + (params as API.ChainReq).chain_name + '/fee');
      commit(DemerisMutationTypes.SET_FEE, { params, value: response.data.fee });
      if (subscribe) {
        commit('SUBSCRIBE', { action: DemerisActionTypes.GET_FEE, payload: { params } });
      }
    } catch (e) {
      throw new SpVuexError('Demeris:GetFee', 'Could not perform API query.');
    }
    return getters['getFee'](JSON.stringify(params));
  },
  async [DemerisActionTypes.GET_FEE_TOKEN]({ commit, getters }, { subscribe = false, params }) {
    try {
      const response = await axios.get('/chain/' + (params as API.ChainReq).chain_name + '/fee/token');
      commit(DemerisMutationTypes.SET_FEE_TOKEN, { params, value: response.data.fee_tokens });
      if (subscribe) {
        commit('SUBSCRIBE', { action: DemerisActionTypes.GET_FEE_TOKEN, payload: { params } });
      }
    } catch (e) {
      throw new SpVuexError('Demeris:GetFeeToken', 'Could not perform API query.');
    }
    return getters['getFeeToken'](JSON.stringify(params));
  },
  async [DemerisActionTypes.GET_PRIMARY_CHANNEL]({ commit, getters }, { subscribe = false, params }) {
    try {
      const response = await axios.get(
        '/chain/' +
          (params as API.ChainReq).chain_name +
          '/primary_channel/' +
          (params as API.ChainReq).destination_chain_name,
      );
      commit(DemerisMutationTypes.SET_PRIMARY_CHANNEL, { params, value: response.data.primary_channel });
      if (subscribe) {
        commit('SUBSCRIBE', { action: DemerisActionTypes.GET_PRIMARY_CHANNEL, payload: { params } });
      }
    } catch (e) {
      throw new SpVuexError('Demeris:GetPrimaryChannel', 'Could not perform API query.');
    }
    return getters['getPrimaryChannel'](JSON.stringify(params));
  },
  async [DemerisActionTypes.GET_PRIMARY_CHANNELS]({ commit, getters }, { subscribe = false, params }) {
    try {
      const response = await axios.get('/chain/' + (params as API.ChainReq).chain_name + '/primary_channels');
      commit(DemerisMutationTypes.SET_PRIMARY_CHANNELS, { params, value: response.data.primary_channels });
      if (subscribe) {
        commit('SUBSCRIBE', { action: DemerisActionTypes.GET_PRIMARY_CHANNELS, payload: { params } });
      }
    } catch (e) {
      throw new SpVuexError('Demeris:GetPrimaryChannels', 'Could not perform API query.');
    }
    return getters['getPrimaryChannels'](JSON.stringify(params));
  },
  async [DemerisActionTypes.GET_CHAIN_STATUS]({ commit, getters }, { subscribe = false, params }) {
    try {
      const response = await axios.get('/chain_status/' + (params as API.ChainReq).chain_name);
      commit(DemerisMutationTypes.SET_CHAIN_STATUS, { params, value: response.data });
      if (subscribe) {
        commit('SUBSCRIBE', { action: DemerisActionTypes.GET_CHAIN_STATUS, payload: { params } });
      }
    } catch (e) {
      throw new SpVuexError('Demeris:GetChainStatus', 'Could not perform API query.');
    }
    return getters['getChainStatus'](JSON.stringify(params));
  },

  // Internal module actions

  [DemerisActionTypes.INIT]({ dispatch, rootGetters }) {
    console.log('Vuex nodule: demeris initialized!');
    if (rootGetters['common/env/client']) {
      rootGetters['common/env/client'].on('newblock', () => {
        dispatch(DemerisActionTypes.STORE_UPDATE);
      });
    }
  },
  [DemerisActionTypes.RESET_STATE]({ commit }) {
    commit(DemerisMutationTypes.RESET_STATE);
  },
  [DemerisActionTypes.STORE_UPDATE]({ state, dispatch }) {
    state._Subscriptions.forEach(subscription => {
      dispatch(subscription.action, subscription.payload);
    });
  },
  [DemerisActionTypes.UNSUBSCRIBE]({ commit }, subscription) {
    commit('UNSUBSCRIBE', subscription);
  },
};
