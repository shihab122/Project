from algorithms.dijkstra import Dijkstra
from algorithms.bellmanford import BellmanFord
from algorithms.floyadwarshall import FloydWarshall
from algorithms.edge import Edge
import time

INF = 999999999999999
''' time in microsecond'''
current_milli_time = lambda: int(round(time.time()))


def main():
    dijkstra = Dijkstra()
    with open('input.txt', 'r+') as f:
        read_data = f.readlines()
        graph = []
        edges = []
        nodes = set()
        for i, data in enumerate(read_data):
            temp = []
            for j, d in enumerate(data.replace(str('\n'), str('')).replace(' ', '').split(',')):
                if d == 'x':
                    d = INF
                else:
                    edges.append(Edge(i, j, int(d)))
                temp.append(int(d))
                if int(d) > 0:
                    nodes.add(j)
            graph.append(temp)
        with open('output.txt', 'a+') as file:
            file.truncate(0)
            # Dijkstra
            file.writelines('Dijkstra Algorithm Analysis\n')
            total_time_for_dijkstra = 0
            for index, node in enumerate(list(nodes)):
                '''Start dijkstra analysis'''
                file.writelines('----------------------------------------------------------------------------------\n')
                dijkstra_start_time = current_milli_time()
                dist, parent = dijkstra.dijkstra(graph, index)
                if dist is not None:
                    file.writelines('Source => ' + str(index) + ' all destination node analysis\n')
                    dijkstra_end_time = current_milli_time()
                    total_time_for_dijkstra += dijkstra_end_time - dijkstra_start_time
                    file.writelines('Dijkstra took total time => ' + str(dijkstra_end_time - dijkstra_start_time)
                                    + ' microsecond\n')
                    dijkstra.printSolution(dist, parent, file, str(index))
                    file.writelines('Total Time expand for dijkstra => ' + str(total_time_for_dijkstra)
                                    + ' microsecond\n')
                    file.writelines(
                        '----------------------------------------------------------------------------------\n')
                '''End dijkstra analysis'''

            # BellmanFord
            file.writelines('Bellman Ford Algorithm Analysis\n')
            total_time_for_bellmanFord = 0
            bellmanFord = BellmanFord()
            for index, node in enumerate(list(nodes)):
                '''Start BellmanFord analysis'''
                file.writelines('----------------------------------------------------------------------------------\n')
                bellmanFord_start_time = current_milli_time()
                dis, v, predecessor = bellmanFord.bellmanFord(graph, len(list(nodes)), len(graph), index, file, edges)
                file.writelines('Source => ' + str(index) + ' all destination node analysis\n')
                bellmanFord_end_time = current_milli_time()
                total_time_for_bellmanFord += bellmanFord_end_time - bellmanFord_start_time
                file.writelines(
                    'BellmanFord took total time => ' + str(total_time_for_bellmanFord) + ' microsecond\n')
                bellmanFord.printBellmanFord(dis, v, file, index, predecessor)
                file.writelines('----------------------------------------------------------------------------------\n')
                '''End BellmanFord analysis'''

            # Floyd War shall
            floydWarshall = FloydWarshall()
            '''Start FloydWarshall analysis'''
            file.writelines('----------------------------------------------------------------------------------\n')
            floydWarshall_start_time = current_milli_time()
            dis, predecessor = floydWarshall.floydWarshall(graph, len(nodes))
            file.writelines('all source  to all destination node analysis\n')
            floydWarshall_end_time = current_milli_time()
            file.writelines(
                'Floyd Warshall took total time => ' + str(
                    floydWarshall_end_time - floydWarshall_start_time) + ' microsecond\n')
            floydWarshall.printSolution(dis, len(nodes), file, predecessor)
            file.writelines('----------------------------------------------------------------------------------\n')
            '''End FloydWarshall analysis'''

            file.close()

if __name__ == "__main__":
    main()
