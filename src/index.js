import React, { useEffect, useRef, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import ForceGraph2D from "react-force-graph-2d";
import {
  data as p0data,
  clusterIds as p0clusterIds,
  clusters as p0clusters
} from "./creamos-300.js";
import {
  data as p1data,
  clusterIds as p1ClusterIds,
  clusters as p1clusters
} from "./creamos-100";
import {
  data as p2data,
  clusterIds as p2ClusterIds,
  clusters as p2clusters
} from "./empty-home-tax300-2.js";

import {
  data as p3data,
  clusterIds as p3ClusterIds,
  clusters as p3clusters
} from "./exampledata";

// import {
//   data as p4data,
//   clusterIds as p4ClusterIds,
//   clusters as p4clusters
// } from "./odense500.js";

import {
  data as p5data,
  clusterIds as p5ClusterIds,
  clusters as p5clusters
} from "./leuven300.js";

import * as d3 from "d3";

const projectMap = {
  creamos300: {
    data: p0data,
    clusterIds: p0clusterIds,
    clusters: p0clusters
  },
  creamos100: {
    data: p1data,
    clusterIds: p1ClusterIds,
    clusters: p1clusters
  },
  emptyHomesTax300: {
    data: p2data,
    clusterIds: p2ClusterIds,
    clusters: p2clusters
  },
  exampleData: {
    data: p3data,
    clusterIds: p3ClusterIds,
    clusters: p3clusters
  },
  // odense500: {
  //   data: p4data,
  //   clusterIds: p4ClusterIds,
  //   clusters: p4clusters
  // },
  leuven300: {
    data: p5data,
    clusterIds: p5ClusterIds,
    clusters: p5clusters
  }
};
const App = () => {
  const [activeProject, setActiveProject] = useState("creamos100");
  const [initialCenter, setInitialCenter] = useState(true);
  const [collapsedClusters, setCollapsedClusters] = useState(
    projectMap[activeProject].clusterIds
  );
  const [hiddenClusters, setHiddenClusters] = useState([]);
  const forceRef = useRef();

  useEffect(() => {
    forceRef.current.d3Force("charge").strength(-40);
    forceRef.current.d3Force("link").distance(30);
    forceRef.current.d3Force("charge").distanceMax(60);
    forceRef.current.d3Force(
      "collide",
      d3.forceCollide().radius((node) => {
        return node.isClusterNode ? node.val / 10 : node.val;
        //  return node.cluster_size ? node.cluster_size : node.degrees / 100;
      })
    );
  }, []);

  useEffect(() => {
    setCollapsedClusters(projectMap[activeProject].clusterIds);
    setInitialCenter(true);
  }, [activeProject]);

  const toggleClusterCollapse = (clusterId) => {
    if (collapsedClusters.includes(clusterId)) {
      setCollapsedClusters(collapsedClusters.filter((id) => id !== clusterId));
    } else {
      setCollapsedClusters([...collapsedClusters, clusterId]);
    }
  };

  const handleNodeClick = (node) => {
    toggleClusterCollapse(node.id);
    if (collapsedClusters.includes(node.id)) {
      forceRef.current.zoom(4.5, 400);
      forceRef.current.centerAt(node.x, node.y, 400);
    }
  };

  const toggleCluster = (clusterId) => {
    if (hiddenClusters.includes(clusterId)) {
      setHiddenClusters(hiddenClusters.filter((id) => id !== clusterId));
    } else {
      setHiddenClusters([...hiddenClusters, clusterId]);
    }
    if (!collapsedClusters.includes(clusterId)) {
      toggleClusterCollapse(clusterId);
    }
  };

  const graphData = useMemo(() => {
    return {
      nodes: projectMap[activeProject].data.nodes.filter(
        (node) => !hiddenClusters.includes(node.id)
      ),
      links: projectMap[activeProject].data.links
    };
  }, [hiddenClusters, activeProject]);

  const reset = () => {
    setHiddenClusters([]);
    setCollapsedClusters(projectMap[activeProject].clusterIds);
    forceRef.current.zoomToFit();
  };

  return (
    <div>
      <h1> Select project </h1>
      {Object.keys(projectMap).map((project) => (
        <button
          key={project}
          onClick={() => {
            setActiveProject(project);
          }}
        >
          {project}
        </button>
      ))}
      <hr />
      <button onClick={reset}>RESET</button>
      <hr />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {projectMap[activeProject].clusters.map((cluster) => (
          <button
            key={cluster.id}
            onClick={() => {
              toggleCluster(cluster.id);
            }}
          >
            Toggle {cluster.name}
          </button>
        ))}
      </div>
      <div style={{ backgroundColor: "rgb(237, 239, 240)" }}>
        <ForceGraph2D
          width={window.innerWidth}
          height={550}
          ref={forceRef}
          onNodeClick={handleNodeClick}
          graphData={graphData}
          cooldownTicks={50}
          nodeRelSize={1}
          onEngineStop={() => {
            if (initialCenter) {
              forceRef.current.zoomToFit();
            }
            setInitialCenter(false);
          }}
          nodeCanvasObjectMode={() => "after"}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = node.isClusterNode
              ? 14 * (node.val / 950)
              : 14 / (globalScale * 1.2);
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = node.isClusterNode ? "white" : "black"; //node.color;
            if (node.isClusterNode) {
              ctx.fillText(label, node.x, node.y);
            } else if (globalScale >= 4.5) {
              ctx.fillText(label, node.x, node.y + 3.5);
            }
          }}
          enableNodeDrag={false}
          nodeVisibility={(node) => {
            if (collapsedClusters.includes(node.clusterId)) {
              return false;
            } else return true;
          }}
          linkVisibility={(link) => {
            if (
              collapsedClusters.includes(link.source.id) &&
              !link.target.isClusterNode
            ) {
              return false;
            } else if (
              hiddenClusters.includes(link.source.id) ||
              hiddenClusters.includes(link.target.id)
            ) {
              return false;
            } else return true;
          }}
        />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("container"));
