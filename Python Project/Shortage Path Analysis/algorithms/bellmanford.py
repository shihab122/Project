# Python3 program for Bellman-Ford's
# single source shortest path algorithm.
from sys import maxsize


# The main function that finds shortest
# distances from src to all other vertices
# using Bellman-Ford algorithm. The function
# also detects negative weight cycle
# The row graph[i] represents i-th edge with
# three values u, v and w.
class BellmanFord:
    def bellmanFord(self, graph, V, E, src, file, edges):
        # Initialize distance of all vertices as infinite.
        dis = [maxsize] * V
        predecessor = [maxsize] * V
        # initialize distance of source as 0
        dis[src] = 0

        # Relax all edges |V| - 1 times. A simple
        # shortest path from src to any other
        # vertex can have at-most |V| - 1 edges
        for k in range(V - 1):
            for i in range(len(edges)):
                if (dis[edges[i].v] > dis[edges[i].u] + edges[i].w) and dis[edges[i].u] != maxsize:
                    dis[edges[i].v] = dis[edges[i].u] + edges[i].w
                    predecessor[edges[i].v] = edges[i].u

        # check for negative-weight cycles.
        # The above step guarantees shortest
        # distances if graph doesn't contain
        # negative weight cycle. If we get a
        # shorter path, then there is a cycle.
        for i in range(len(edges)):
            if (dis[edges[i].v] > dis[edges[i].u] + edges[i].w) and dis[edges[i].u] != maxsize:
                file.writelines("Graph contains negative weight cycle")
        return dis, V, predecessor

    def printBellmanFord(self, dis, V, file, src, predecessor):
        file.writelines("Vertex \t\tDistance from Source\t\tPath From Source\n")
        for i in range(V):
            file.writelines("%d --> %d\t\t\t\t%d\t\t\t\t\t" % (src, i, dis[i]))
            path = str(i)
            current = predecessor[i]
            while current < V and current is not None:
                path += ' ' + str(current)
                if current >= V or predecessor[current] is None:
                    break
                if current == i:
                    break
                current = predecessor[current]
            file.writelines(path + '\n')

