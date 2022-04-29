/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { removeExceedingStepsFromRoutes } from './route';

const routes = [
  {
    steps: [
      {
        type: 'pool',
        protocol: 'gravity',
        data: {
          from: {
            denom: 'uatom',
            amount: '1880293',
          },
          to: {
            denom: 'ibc/C932ADFE2B4216397A4F17458B6E4468499B86C3BC8116180F85D799D6F5CC1B',
            amount: '10896490764',
          },
          pool_id: 'gravity/9',
        },
      },
      {
        type: 'ibc',
        protocol: 'gravity',
        data: {
          from: {
            denom: 'ibc/C932ADFE2B4216397A4F17458B6E4468499B86C3BC8116180F85D799D6F5CC1B',
            amount: '10896490764',
          },
          to: {
            denom: 'basecro',
            amount: '10896490764',
          },
        },
      },
    ],
  },
  {
    steps: [
      {
        type: 'pool',
        protocol: 'gravity',
        data: {
          from: {
            denom: 'uatom',
            amount: '1880293',
          },
          to: {
            denom: 'ibc/B2B5AEE174062FA7804AC95223D8169852F8F58962C51C66391C272C838258B7',
            amount: '144208567',
          },
          pool_id: 'gravity/11',
        },
      },
      {
        type: 'ibc',
        protocol: 'gravity',
        data: {
          from: {
            denom: 'ibc/B2B5AEE174062FA7804AC95223D8169852F8F58962C51C66391C272C838258B7',
            amount: '144208567',
          },
          to: {
            denom: 'uixo',
            amount: '144208567',
          },
        },
      },
      {
        type: 'ibc',
        protocol: 'osmosis',
        data: {
          from: {
            denom: 'uixo',
            amount: '144208567',
          },
          to: {
            denom: 'ibc/F3FF7A84A73B62921538642F9797C423D2B4C4ACB3C7FCFFCE7F12AA69909C4B',
            amount: '144208567',
          },
        },
      },
      {
        type: 'pool',
        protocol: 'osmosis',
        data: {
          from: {
            denom: 'ibc/F3FF7A84A73B62921538642F9797C423D2B4C4ACB3C7FCFFCE7F12AA69909C4B',
            amount: '144208567',
          },
          to: {
            denom: 'uosmo',
            amount: '8016909',
          },
          pool_id: 'osmosis/557',
        },
      },
      {
        type: 'pool',
        protocol: 'osmosis',
        data: {
          from: {
            denom: 'uosmo',
            amount: '8016909',
          },
          to: {
            denom: 'ibc/E6931F78057F7CC5DA0FD6CEF82FF39373A6E0452BF1FD76910B93292CF356C1',
            amount: '10840462285',
          },
          pool_id: 'osmosis/9',
        },
      },
      {
        type: 'ibc',
        protocol: 'osmosis',
        data: {
          from: {
            denom: 'ibc/E6931F78057F7CC5DA0FD6CEF82FF39373A6E0452BF1FD76910B93292CF356C1',
            amount: '10840462285',
          },
          to: {
            denom: 'basecro',
            amount: '10840462285',
          },
        },
      },
    ],
  },
  {
    steps: [
      {
        type: 'pool',
        protocol: 'gravity',
        data: {
          from: {
            denom: 'uatom',
            amount: '1880293',
          },
          to: {
            denom: 'ibc/42E47A5BA708EBE6E0C227006254F2784E209F4DBD3C6BB77EDC4B29EF875E8E',
            amount: '10744636035',
          },
          pool_id: 'gravity/7',
        },
      },
      {
        type: 'ibc',
        protocol: 'gravity',
        data: {
          from: {
            denom: 'ibc/42E47A5BA708EBE6E0C227006254F2784E209F4DBD3C6BB77EDC4B29EF875E8E',
            amount: '10744636035',
          },
          to: {
            denom: 'udvpn',
            amount: '10744636035',
          },
        },
      },
      {
        type: 'ibc',
        protocol: 'osmosis',
        data: {
          from: {
            denom: 'udvpn',
            amount: '10744636035',
          },
          to: {
            denom: 'ibc/9712DBB13B9631EDFA9BF61B55F1B2D290B2ADB67E3A4EB3A875F3B6081B3B84',
            amount: '10744636035',
          },
        },
      },
      {
        type: 'pool',
        protocol: 'osmosis',
        data: {
          from: {
            denom: 'ibc/9712DBB13B9631EDFA9BF61B55F1B2D290B2ADB67E3A4EB3A875F3B6081B3B84',
            amount: '10744636035',
          },
          to: {
            denom: 'uosmo',
            amount: '7923199',
          },
          pool_id: 'osmosis/5',
        },
      },
      {
        type: 'pool',
        protocol: 'osmosis',
        data: {
          from: {
            denom: 'uosmo',
            amount: '7923199',
          },
          to: {
            denom: 'ibc/E6931F78057F7CC5DA0FD6CEF82FF39373A6E0452BF1FD76910B93292CF356C1',
            amount: '10713748528',
          },
          pool_id: 'osmosis/9',
        },
      },
      {
        type: 'ibc',
        protocol: 'osmosis',
        data: {
          from: {
            denom: 'ibc/E6931F78057F7CC5DA0FD6CEF82FF39373A6E0452BF1FD76910B93292CF356C1',
            amount: '10713748528',
          },
          to: {
            denom: 'basecro',
            amount: '10713748528',
          },
        },
      },
    ],
  },
];

it('should return routes without last ibc transfer', () => {
  expect(removeExceedingStepsFromRoutes(routes)).toMatchInlineSnapshot(`
    [
      {
        "steps": [
          {
            "data": {
              "from": {
                "amount": "1880293",
                "denom": "uatom",
              },
              "pool_id": "gravity/9",
              "to": {
                "amount": "10896490764",
                "denom": "ibc/C932ADFE2B4216397A4F17458B6E4468499B86C3BC8116180F85D799D6F5CC1B",
              },
            },
            "protocol": "gravity",
            "type": "pool",
          },
        ],
      },
      {
        "steps": [
          {
            "data": {
              "from": {
                "amount": "1880293",
                "denom": "uatom",
              },
              "pool_id": "gravity/11",
              "to": {
                "amount": "144208567",
                "denom": "ibc/B2B5AEE174062FA7804AC95223D8169852F8F58962C51C66391C272C838258B7",
              },
            },
            "protocol": "gravity",
            "type": "pool",
          },
          {
            "data": {
              "from": {
                "amount": "144208567",
                "denom": "ibc/B2B5AEE174062FA7804AC95223D8169852F8F58962C51C66391C272C838258B7",
              },
              "to": {
                "amount": "144208567",
                "denom": "uixo",
              },
            },
            "protocol": "gravity",
            "type": "ibc",
          },
          {
            "data": {
              "from": {
                "amount": "144208567",
                "denom": "uixo",
              },
              "to": {
                "amount": "144208567",
                "denom": "ibc/F3FF7A84A73B62921538642F9797C423D2B4C4ACB3C7FCFFCE7F12AA69909C4B",
              },
            },
            "protocol": "osmosis",
            "type": "ibc",
          },
          {
            "data": {
              "from": {
                "amount": "144208567",
                "denom": "ibc/F3FF7A84A73B62921538642F9797C423D2B4C4ACB3C7FCFFCE7F12AA69909C4B",
              },
              "pool_id": "osmosis/557",
              "to": {
                "amount": "8016909",
                "denom": "uosmo",
              },
            },
            "protocol": "osmosis",
            "type": "pool",
          },
          {
            "data": {
              "from": {
                "amount": "8016909",
                "denom": "uosmo",
              },
              "pool_id": "osmosis/9",
              "to": {
                "amount": "10840462285",
                "denom": "ibc/E6931F78057F7CC5DA0FD6CEF82FF39373A6E0452BF1FD76910B93292CF356C1",
              },
            },
            "protocol": "osmosis",
            "type": "pool",
          },
        ],
      },
      {
        "steps": [
          {
            "data": {
              "from": {
                "amount": "1880293",
                "denom": "uatom",
              },
              "pool_id": "gravity/7",
              "to": {
                "amount": "10744636035",
                "denom": "ibc/42E47A5BA708EBE6E0C227006254F2784E209F4DBD3C6BB77EDC4B29EF875E8E",
              },
            },
            "protocol": "gravity",
            "type": "pool",
          },
          {
            "data": {
              "from": {
                "amount": "10744636035",
                "denom": "ibc/42E47A5BA708EBE6E0C227006254F2784E209F4DBD3C6BB77EDC4B29EF875E8E",
              },
              "to": {
                "amount": "10744636035",
                "denom": "udvpn",
              },
            },
            "protocol": "gravity",
            "type": "ibc",
          },
          {
            "data": {
              "from": {
                "amount": "10744636035",
                "denom": "udvpn",
              },
              "to": {
                "amount": "10744636035",
                "denom": "ibc/9712DBB13B9631EDFA9BF61B55F1B2D290B2ADB67E3A4EB3A875F3B6081B3B84",
              },
            },
            "protocol": "osmosis",
            "type": "ibc",
          },
          {
            "data": {
              "from": {
                "amount": "10744636035",
                "denom": "ibc/9712DBB13B9631EDFA9BF61B55F1B2D290B2ADB67E3A4EB3A875F3B6081B3B84",
              },
              "pool_id": "osmosis/5",
              "to": {
                "amount": "7923199",
                "denom": "uosmo",
              },
            },
            "protocol": "osmosis",
            "type": "pool",
          },
          {
            "data": {
              "from": {
                "amount": "7923199",
                "denom": "uosmo",
              },
              "pool_id": "osmosis/9",
              "to": {
                "amount": "10713748528",
                "denom": "ibc/E6931F78057F7CC5DA0FD6CEF82FF39373A6E0452BF1FD76910B93292CF356C1",
              },
            },
            "protocol": "osmosis",
            "type": "pool",
          },
        ],
      },
    ]
  `);
});
