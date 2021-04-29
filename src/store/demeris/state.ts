import * as API from '@/types/api'
import {DemerisSubscriptions} from './action-types'
export type State = {
	balances: Record<string,Array<API.Balance>>
	verifiedPath: Record<string,API.VerifiedPath>
	feeAddress:Record<string,API.FeeAddress>
	fee:Record<string,API.Fee>
	feeToken: Record<string,API.FeeToken>
	stakingBalances:Record<string,Array<API.StakingBalance>>
	prices:Array<API.Price> | null
	chains:Array<API.Chain> | null
	verifiedDenoms:Array<API.VerifiedDenom> | null
	primaryChannel: Record<string,API.PrimaryChannel>
	chainStatus:Record<string,API.ChainStatus>
	_Subscriptions: Set<DemerisSubscriptions>

}
export function getDefaultState():State {
	return {
		balances: {},
		verifiedPath: {},
		feeAddress: {},
		fee: {},
		feeToken: {},
		stakingBalances: {},
		prices: null,
		chains: null,
		verifiedDenoms: null,
		primaryChannel: {},
		chainStatus: {},
		_Subscriptions: new Set()
	}
}