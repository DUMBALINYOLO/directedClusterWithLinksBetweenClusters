const data = {
  nodes: [
    {
      id: "0",
      isClusterNode: true,
      name: "Antoine",
      rel_cluster_size: 23.0,
      cluster_size: 23
    },
    {
      cluster_id: "0",
      id: "fun",
      name: "fun",
      rank: 0.0057451331787243265,
      degrees: 92
    },
    {
      cluster_id: "0",
      id: "design",
      name: "design",
      rank: 0.005068498535376397,
      degrees: 68
    },
    {
      cluster_id: "0",
      id: "user testing",
      name: "user testing",
      rank: 0.003889718842619532,
      degrees: 58
    },
    {
      cluster_id: "0",
      id: "insights",
      name: "insights",
      rank: 0.0033520839439798457,
      degrees: 68
    },
    {
      cluster_id: "0",
      id: "workshops",
      name: "workshops",
      rank: 0.0031855928931322666,
      degrees: 64
    },
    {
      cluster_id: "0",
      id: "engagement",
      name: "engagement",
      rank: 0.003054218939387304,
      degrees: 42
    },
    {
      cluster_id: "0",
      id: "ux",
      name: "ux",
      rank: 0.0027633938998241937,
      degrees: 62
    },
    {
      cluster_id: "0",
      id: "explore",
      name: "explore",
      rank: 0.002194065664492493,
      degrees: 39
    },
    {
      cluster_id: "0",
      id: "feedback",
      name: "feedback",
      rank: 0.0020876671277605266,
      degrees: 53
    },
    {
      cluster_id: "0",
      id: "iterate",
      name: "iterate",
      rank: 0.0019403641879695453,
      degrees: 38
    },
    {
      cluster_id: "0",
      id: "change",
      name: "change",
      rank: 0.0018537246830935762,
      degrees: 37
    },
    {
      cluster_id: "0",
      id: "Citizenlab",
      name: "Citizenlab",
      rank: 0.0017919843173459203,
      degrees: 39
    },
    {
      cluster_id: "0",
      id: "hipster",
      name: "hipster",
      rank: 0.0017278628702688274,
      degrees: 38
    },
    {
      cluster_id: "0",
      id: "final final design",
      name: "final final design",
      rank: 0.001534155786756376,
      degrees: 31
    },
    {
      cluster_id: "0",
      id: "Berlin",
      name: "Berlin",
      rank: 0.0014963464089964653,
      degrees: 24
    },
    {
      cluster_id: "0",
      id: "new job",
      name: "new job",
      rank: 0.0014594235773390948,
      degrees: 33
    },
    {
      cluster_id: "0",
      id: "situaci\u00f3n",
      name: "situaci\u00f3n",
      rank: 0.0014541477194242353,
      degrees: 28
    },
    {
      cluster_id: "0",
      id: "natural",
      name: "natural",
      rank: 0.0012946223482058696,
      degrees: 14
    }
  ],
  links: [
    { source: "0", target: "fun" },
    { source: "0", target: "design" },
    { source: "0", target: "user testing" },
    { source: "0", target: "insights" },
    { source: "0", target: "workshops" },
    { source: "0", target: "engagement" },
    { source: "0", target: "ux" },
    { source: "0", target: "explore" },
    { source: "0", target: "feedback" },
    { source: "0", target: "iterate" },
    { source: "0", target: "change" },
    { source: "0", target: "Citizenlab" },
    { source: "0", target: "hipster" },
    { source: "0", target: "final final design" },
    { source: "0", target: "Berlin" },
    { source: "0", target: "new job" },
    { source: "0", target: "natural" }
  ]
};

data.nodes.forEach((node) => {
  node.val = node.cluster_size * 10 || node.degrees / 30 + 1;
  if (node.isClusterNode) {
    node.clusterId = null;
  } else node.clusterId = node.cluster_id;
});

export const clusters = data.nodes.filter((node) => node.isClusterNode);
export const clusterIds = clusters.map((cluster) => cluster.id);

export { data };
