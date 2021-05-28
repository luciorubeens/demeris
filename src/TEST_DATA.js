export const TEST_DATA = {
  balances: [
    {
      address: 'cosmos14pmvh0d4fucylhawvcd0hxkrky99hwcnm0usr5',
      base_denom: 'uatom',
      verified: true,
      native: true,
      amount: 1337,
      on_chain: 'cosmos',
      fee_token: true,
      ibc: {},
    },
    {
      address: 'cosmos14pmvh0d4fucylhawvcd0hxkrky99hwcnm0usr5',
      base_denom: 'uluna',
      verified: true,
      native: false,
      amount: 10000,
      on_chain: 'cosmos',
      fee_token: true,
      ibc: {
        source_chain: 'terra-columbus-3',
        ibc_denom: 'ibc/7F1D3FCF4AE79E1554D670D1AD949A9BA4E4A3C76C63093E17E446A46061A7A2',
        path: 'transfer/channel-0/transfer/channel-6',
        verified_path: ['Kava', 'Terra'],
      },
    },
    {
      address: 'cosmos14pmvh0d4fucylhawvcd0hxkrky99hwcnm0usr5',
      base_denom: 'ukava',
      verified: false,
      native: false,
      amount: 10000,
      on_chain: 'cosmos',
      ibc: {
        source_chain: 'yeetchain-0',
        ibc_denom: 'ibc/3F1D3FCF4AE79E1554D670D1AD949A9BA4E4A3C76C63093E17E446A46061A7A2',
        path: 'transfer/channel-42/transfer/channel-44',
        verified_path: [],
      },
    },
  ],
};
