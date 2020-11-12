# Class to represent a graph
class Dijkstra:

    # A utility function to find the
    # vertex with minimum dist value, from
    # the set of vertices still in queue
    def minDistance(self, dist, queue):
        # Initialize min value and min_index as -1
        minimum = float("Inf")
        min_index = -1

        # from the dist array,pick one which
        # has min value and is till in queue
        for i in range(len(dist)):
            if dist[i] < minimum and i in queue:
                minimum = dist[i]
                min_index = i
        return min_index

    # Function to print shortest path
    # from source to j
    # using parent array
    def printPath(self, parent, j, file):

        # Base Case : If j is source
        if parent[j] == -1:
            file.writelines(str(j)+" "),
            return
        self.printPath(parent, parent[j], file)
        file.writelines(str(j)+' '),

    # A utility function to print
    # the constructed distance
    # array
    def printSolution(self, dist, parent, file, src):
        file.writelines("Vertex \t\tDistance from Source\tPath")
        for i in range(1, len(dist)):
            file.writelines("\n%s --> %d \t\t%d \t\t\t\t\t" % (src, i, dist[i])),
            self.printPath(parent, i, file)
        file.writelines('\n\n')

    def printSolutionForSingleSourceAndDestination(self, dist, parent, file, src, dest):
        file.writelines("Vertex \t\tDistance from Source\tPath")
        for i in range(1, len(dist)):
            if i == dest:
                file.writelines("\n%s --> %d \t\t%d \t\t\t\t\t" % (src, i, dist[i])),
                self.printPath(parent, i, file)
                break
        file.writelines('\n\n')

    def dijkstra(self, graph, src):

        row = len(graph)
        col = len(graph[0])

        # The output array. dist[i] will hold
        # the shortest distance from src to i
        # Initialize all distances as INFINITE
        dist = [float("Inf")] * row

        # Parent array to store
        # shortest path tree
        parent = [-1] * row

        # Distance of source vertex
        # from itself is always 0
        dist[src] = 0

        # Add all vertices in queue
        queue = []
        for i in range(row):
            queue.append(i)

        # Find shortest path for all vertices
        while queue:

            # Pick the minimum dist vertex
            # from the set of vertices
            # still in queue
            u = self.minDistance(dist, queue)

            # remove min element
            queue.remove(u)

            # Update dist value and parent
            # index of the adjacent vertices of
            # the picked vertex. Consider only
            # those vertices which are still in
            # queue
            for i in range(col):
                if graph[u][i] and i in queue:
                    if dist[u] + graph[u][i] < dist[i]:
                        dist[i] = dist[u] + graph[u][i]
                        parent[i] = u

                    # print the constructed distance array
        return dist, parent
