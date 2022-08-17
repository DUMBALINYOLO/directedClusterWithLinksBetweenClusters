const data = {
  nodes: [
    {
      id: "0",
      isClusterNode: true,
      clusted_id: null,
      name: "komen, fietser, rijden",
      val: 650,
      color: "#0000FF"
    },
    {
      cluster_id: "0",
      id: "komen",
      name: "komen",
      val: 3,
      color: "#0000FF"
    },
    {
      cluster_id: "0",
      id: "fietser",
      name: "fietser",
      val: "4",
      color: "#0000FF"
    },
    {
      id: "1",
      isClusterNode: true,
      name: "kind, school, student",
      val: 300,
      color: "#00FF00"
    },
    {
      cluster_id: "1",
      id: "kind",
      name: "kind",
      val: 8.5,
      color: "#00FF00"
    },
    {
      cluster_id: "1",
      id: "school",
      name: "school",
      val: 1,
      color: "#00FF00"
    },
    {
      cluster_id: "1",
      id: "student",
      name: "student",
      val: 2,
      color: "#00FF00"
    }
  ],
  links: [
    { source: "0", target: "1" },
    { source: "0", target: "komen" },
    { source: "0", target: "fietser" },
    { source: "1", target: "kind" },
    { source: "1", target: "school" },
    { source: "1", target: "student" }
  ]
};

data.nodes.forEach((node) => {
  if (node.isClusterNode) {
    node.clusterId = null;
  } else node.clusterId = node.cluster_id;
});

export const clusters = data.nodes.filter((node) => node.isClusterNode);
export const clusterIds = clusters.map((cluster) => cluster.id);

export { data };
