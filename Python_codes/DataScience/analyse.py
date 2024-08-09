import matplotlib.pyplot as plt

def accuracy():
    # Calculate the accuracy for each cluster
    accuracy_per_cluster = {}
    for cluster, category in cluster_bug_category_mapping_corrected.items():
        if category in correct_bug_categories:
            accuracy_per_cluster[cluster] = 1
        else:
            accuracy_per_cluster[cluster] = 0

    # Calculate the total accuracy
    total_accuracy = sum(accuracy_per_cluster.values()) / len(accuracy_per_cluster)

    # Display the accuracy for each cluster and the total accuracy
    accuracy_per_cluster_df = pd.DataFrame(list(accuracy_per_cluster.items()), columns=['Cluster', 'Accuracy'])
    accuracy_per_cluster_df.sort_values(by='Cluster', inplace=True)

    plt.figure(figsize=(10, 6))
    plt.bar(accuracy_per_cluster_df['Cluster'], accuracy_per_cluster_df['Accuracy'], color='skyblue')
    plt.xlabel('Cluster')
    plt.ylabel('Accuracy')
    plt.title('Accuracy of Cluster Mapping to Bug Categories')
    plt.xticks(rotation=45)
    plt.show()


