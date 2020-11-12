from algorithms.dijkstra import Dijkstra
from algorithms.bellmanford import BellmanFord
from algorithms.floyadwarshall import FloydWarshall
from algorithms.edge import Edge
import time
import numpy as np
import sys

import matplotlib.pyplot as plt

INF = 999999999999999
''' time in microsecond'''
current_milli_time = lambda: int(round(time.time()))


def main():
    dijkstra = Dijkstra()
    print("if user input press 1")
    print("if file input press 2")
    input_method = input()

    graph = []
    edges = []
    nodes = set()
    y_units = [0.0, 0.0, 0.0]

    if input_method == "1":
        rows_input = input("Rows? ")
        col_input = input("Columns? ")
        for i in range(0, int(rows_input)):
            line = sys.stdin.readline()
            temp = []
            for j, d in enumerate(line.replace(str('\n'), str('')).replace(' ', '').split(',')):
                if d == 'x':
                    d = INF
                else:
                    edges.append(Edge(i, j, int(d)))
                temp.append(int(d))
                if int(d) > 0:
                    nodes.add(j)
            graph.append(temp)
        source = int(input("Source? "))
        destination = int(input("Destination? "))
        with open('output.txt', 'a+') as file:
            file.truncate(0)

            # Dijkstra
            file.writelines('Dijkstra Algorithm Analysis for Given Source and Destination\n')
            total_time_for_dijkstra = 0
            for index, node in enumerate(list(nodes)):
                '''Start dijkstra analysis for Given Source and Destination'''
                file.writelines('----------------------------------------------------------------------------------\n')
                dijkstra_start_time = current_milli_time()
                dist, parent = dijkstra.dijkstra(graph, index)
                if dist is not None and index == source:
                    file.writelines('Source ' + str(index) + ' to Destination ' + str(destination) + ' analysis\n')
                    dijkstra_end_time = current_milli_time()
                    total_time_for_dijkstra += dijkstra_end_time - dijkstra_start_time
                    y_units[0] = total_time_for_dijkstra
                    file.writelines('Dijkstra took total time for given source and destination => ' + str(dijkstra_end_time - dijkstra_start_time)
                                    + ' microsecond\n')
                    dijkstra.printSolutionForSingleSourceAndDestination(dist, parent, file, str(index), destination)
                    file.writelines('Total Time expand for given source and destination in dijkstra => ' + str(total_time_for_dijkstra)
                                    + ' microsecond\n')
                    file.writelines(
                        '----------------------------------------------------------------------------------\n\n')
                    break
                '''End dijkstra analysis for Given Source and Destination'''

            # BellmanFord
            file.writelines('Bellman Ford Algorithm Analysis for Given Source and Destination\n')
            total_time_for_bellmanFord = 0
            bellmanFord = BellmanFord()
            for index, node in enumerate(list(nodes)):
                '''Start BellmanFord analysis'''
                file.writelines(
                    '----------------------------------------------------------------------------------\n')
                bellmanFord_start_time = current_milli_time()
                dis, v, predecessor = bellmanFord.bellmanFord(graph, len(list(nodes)), len(graph), index, file,
                                                              edges)
                bellmanFord_end_time = current_milli_time()
                total_time_for_bellmanFord += bellmanFord_end_time - bellmanFord_start_time
                y_units[1] = total_time_for_bellmanFord
                if index == source:
                    file.writelines('Source ' + str(index) + ' to Destination ' + str(destination) + ' analysis\n')
                    file.writelines(
                        'BellmanFord took total time for given source and destination => ' + str(
                            total_time_for_bellmanFord) + ' microsecond\n')
                    bellmanFord.printBellmanFordForSingleSourceAndDestination(dis, v, file, index, predecessor, destination)
                    file.writelines(
                        '----------------------------------------------------------------------------------\n')
                    break
                '''End BellmanFord analysis for Given Source and Destination'''

            # Floyd War shall
            floydWarshall = FloydWarshall()
            '''Start FloydWarshall analysis for Given Source and Destination'''
            file.writelines(
                '----------------------------------------------------------------------------------\n\n')
            floydWarshall_start_time = current_milli_time()
            dis, predecessor = floydWarshall.floydWarshall(graph, len(nodes))
            file.writelines('For Given Source to Destination Node Analysis\n')
            floydWarshall_end_time = current_milli_time()
            y_units[2] = floydWarshall_end_time - floydWarshall_start_time
            file.writelines(
                'Floyd Warshall took total time for given source and destination => ' + str(
                    floydWarshall_end_time - floydWarshall_start_time) + ' microsecond\n')
            floydWarshall.printSolutionForGivenSourceAndDestination(dis, len(nodes), file, predecessor, source, destination)
            file.writelines(
                '----------------------------------------------------------------------------------\n\n\n')
            '''End FloydWarshall analysis for Given Source and Destination'''

            # Dijkstra
            file.writelines('Dijkstra Algorithm Analysis For All Possible Combinations\n')
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
                        '----------------------------------------------------------------------------------\n\n')
                '''End dijkstra analysis'''

            # BellmanFord
            file.writelines('Bellman Ford Algorithm Analysis For All Possible Combinations\n')
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
                file.writelines('----------------------------------------------------------------------------------\n\n')
                '''End BellmanFord analysis'''

            # Floyd War shall
            floydWarshall = FloydWarshall()
            '''Start FloydWarshall analysis'''
            file.writelines('----------------------------------------------------------------------------------\n')
            floydWarshall_start_time = current_milli_time()
            dis, predecessor = floydWarshall.floydWarshall(graph, len(nodes))
            file.writelines('Bellman Ford Algorithm Analysis For All Possible Combinations\n')
            floydWarshall_end_time = current_milli_time()
            file.writelines(
                'Floyd Warshall took total time => ' + str(
                    floydWarshall_end_time - floydWarshall_start_time) + ' microsecond\n')
            floydWarshall.printSolution(dis, len(nodes), file, predecessor)
            file.writelines('----------------------------------------------------------------------------------\n')
            '''End FloydWarshall analysis'''

            file.close()

            x_units = [1, 2, 3]

            tick_label = ['Dijkstra', 'BellmanFord', 'Floyd Warshall']
            fig = plt.figure(figsize=(10, 10))
            plt.yticks(np.arange(0, 40, 1))
            plt.ylim([0, 40])
            plt.bar(x_units, y_units, tick_label=tick_label, width=0.8, color=['red', 'green', 'blue']),
            plt.xlabel('x - axis')
            plt.ylabel('y - axis')
            plt.title('Time analysis chart for single source and destination!')

            plt.show()
    else:
        with open('input.txt', 'r+') as f:
            read_data = f.readlines()
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
                        y_units[0] = total_time_for_dijkstra
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
                    y_units[1] = total_time_for_bellmanFord
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
                y_units[2] = floydWarshall_end_time - floydWarshall_start_time
                file.writelines(
                    'Floyd Warshall took total time => ' + str(
                        floydWarshall_end_time - floydWarshall_start_time) + ' microsecond\n')
                floydWarshall.printSolution(dis, len(nodes), file, predecessor)
                file.writelines('----------------------------------------------------------------------------------\n')
                '''End FloydWarshall analysis'''

                file.close()

                x_units = [1, 2, 3]

                tick_label = ['Dijkstra', 'BellmanFord', 'Floyd Warshall']
                fig = plt.figure(figsize=(10, 10))
                plt.yticks(np.arange(0, 40, 1))
                plt.ylim([0, 40])
                plt.bar(x_units, y_units, tick_label=tick_label,width=0.8, color=['red', 'green', 'blue']),
                plt.xlabel('x - axis')
                plt.ylabel('y - axis')
                plt.title('Time analysis chart!')

                plt.show()

if __name__ == "__main__":
    main()
