import copy
# Python Program for Floyd Warshall Algorithm

# Number of vertices in the graph

# Define infinity as the large enough value. This value will be
# used for vertices not connected to each other
INF = 99999999999999


# Solves all pair shortest path via Floyd Warshall Algorithm
class FloydWarshall:
    def floydWarshall(self, graph, V):
        # The output array. dist[i] will hold
        # the shortest distance from src to i
        # Initialize all distances as INFINITE

        dist = copy.deepcopy(graph)
        predecessor = [[0 for i in range(V + 1)] for j in range(V + 1)]
        for i in range(0, V):
            for j in range(0, V):
                predecessor[i][j] = i
                if i == j:
                    predecessor[i][j] = 0
                    dist[i][j] = 0
                if i != j and graph[i][j] == 0:
                    predecessor[i][j] = INF

        for k in range(0, V):
            for i in range(0, V):
                for j in range(0, V):
                    if dist[i][j] > dist[i][k] + dist[k][j]:
                        dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
                        predecessor[i][j] = predecessor[k][j]
        return dist, predecessor

    # A utility function to print the solution
    def printSolution(self, dist, V, file, predecessor):
        file.writelines('----------------------------------------------------------------------------------\n')
        for i in range(V):
            file.writelines('----------------------------------------------------------------------------------\n')
            file.writelines('Source => ' + str(i) + ' all destination node analysis\n')
            file.writelines("Vertex \t\tDistance from Source\t\tPath from Source\n")
            for j in range(V):
                file.writelines("%d --> %d \t\t\t" % (i, j))
                if dist[i][j] == INF:
                    file.writelines("INF"),
                else:
                    file.writelines(str((dist[i][j]))),

                # Print Path
                file.writelines("\t\t\t\t\t")
                ConstructPath(predecessor, i, j, '', file)
                file.writelines('\n')
            file.writelines('----------------------------------------------------------------------------------\n')

    def printSolutionForGivenSourceAndDestination(self, dist, V, file, predecessor, src, dest):
        file.writelines('----------------------------------------------------------------------------------\n')
        for i in range(V):
            if i == src:
                file.writelines('----------------------------------------------------------------------------------\n')
                file.writelines('Source ' + str(i) + ' to Destination ' + str(dest) + ' analysis\n')
                file.writelines("Vertex \t\tDistance from Source\t\tPath from Source\n")
                for j in range(V):
                    if j == dest:
                        file.writelines("%d --> %d \t\t\t" % (i, j))
                        if dist[i][j] == INF:
                            file.writelines("INF"),
                        else:
                            file.writelines(str((dist[i][j]))),

                        # Print Path
                        file.writelines("\t\t\t\t\t")
                        ConstructPath(predecessor, i, j, '', file)
                        file.writelines('\n')
                        break
                file.writelines('----------------------------------------------------------------------------------\n')
                break


def ConstructPath(predecessor, i, j, path, file):
    i, j = int(i), int(j)
    if i == j:
        file.writelines(str(i) + ' ')
        # path += str(i) + ' '
    elif predecessor[i][j] == INF:
        # path = "Path not exist!"
        file.writelines("Path not exist!")
    else:
        ConstructPath(predecessor, i, predecessor[i][j], path, file)
        # path += str(j) + ' '
        file.writelines(str(j) + ' ')
