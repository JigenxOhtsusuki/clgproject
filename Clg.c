#include<stdio.h>
#include<stdlib.h>

// Node structure definition
struct node {
	int data;
	struct node* next;
};

struct node* head = NULL;

// Function prototypes
void create();
void display();
void insert(int pos);
void delete(int pos);
struct node* create_node(int data);
struct node* get_node_at(int pos);

// Main function
int main() {
	int choice;
	while (1) {
	    printf("\n*****\n");
	    printf("0. Create\n");
	    printf("1. Display\n");
	    printf("2. Insert Node at Beginning\n");
	    printf("3. Insert Node at Specific Position\n");
	    printf("4. Insert Node at End of LinkedList\n");
	    printf("5. Delete Node at Beginning\n");
	    printf("6. Delete Node at End\n");
	    printf("7. Delete Node at Specific Position\n");
	    printf("8. ** To Exit **\n");
	    
		printf("Enter your choice: ");
		scanf("%d", &choice);
		switch (choice) {
			case 0: create(); break;
			case 1: display(); break;
			case 2: insert(0); break;
			case 3: {
				int pos;
				printf("Enter position: ");
				scanf("%d", &pos);
				insert(pos); 
				break;
			}
			case 4: {
				insert(-1); 
				break;
			}
			case 5: delete(0); break;
			case 6: delete(-1); break;
			case 7: {
				int pos;
				printf("Enter position to delete: ");
				scanf("%d", &pos);
				delete(pos); 
				break;
			}
			case 8: exit(0);
			default: printf("\nWrong Choice"); break;
		}
	}
}

// Function to create a new node
void create() {
	int data;
	printf("Enter node data: ");
	scanf("%d", &data);
	insert(-1); // Insert at the end
}

// Function to display the linked list
void display() {
	if (head == NULL) {
		printf("Linked List is Empty\n");
		return;
	}
	struct node* ptr = head;
	printf("LinkedList: ");
	while (ptr != NULL) {
		printf("%d ", ptr->data);
		ptr = ptr->next;
	}
	printf("\n");
}

// Function to insert a node at a specific position
void insert(int pos) {
	int data;
	printf("Enter node data: ");
	scanf("%d", &data);
	struct node* new_node = create_node(data);

	if (pos == 0 || head == NULL) {
		// Insert at the beginning
		new_node->next = head;
		head = new_node;
	} else {
		struct node* prev = get_node_at(pos - 1);
		new_node->next = prev->next;
		prev->next = new_node;
	}
}

// Function to delete a node at a specific position
void delete(int pos) {
	if (head == NULL) {
		printf("Linked List is empty | Nothing to delete\n");
		return;
	}

	struct node* temp;
	if (pos == 0) {
		// Delete at the beginning
		temp = head;
		head = head->next;
	} else {
		struct node* prev = get_node_at(pos - 1);
		temp = prev->next;
		prev->next = temp->next;
	}

	free(temp);
	printf("Node Deleted\n");
}

// Function to create a new node
struct node* create_node(int data) {
	struct node* new_node = (struct node*)malloc(sizeof(struct node));
	new_node->data = data;
	new_node->next = NULL;
	return new_node;
}

// Function to get a node at a specific position
struct node* get_node_at(int pos) {
	struct node* ptr = head;
	if (pos < 0) {
		while (ptr->next != NULL) {
			ptr = ptr->next;
		}
	} else {
		for (int i = 0; i < pos && ptr->next != NULL; i++) {
			ptr = ptr->next;
		}
	}
	return ptr;
}
