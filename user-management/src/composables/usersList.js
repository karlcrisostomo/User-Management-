import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";

export default {
  setup() {
    const selectedUser = ref(null);
    const isDialogOpen = ref(false);
    const text = ref(""); // Added ref for the user input
    const isLoading = ref(false);
    const users = ref([]);
    const columns = [
      {
        name: "Name",
        required: true,
        label: "Name",
        align: "left",
        field: "name",
        sortable: true,
      },
      {
        name: "Username",
        align: "left",
        label: "Username",
        field: "username",
        sortable: true,
      },
      {
        name: "Email",
        align: "left",
        label: "Email",
        field: "email",
        sortable: true,
      },
      {
        name: "Address",
        align: "left",
        label: "Address",
        field: "address",
        format: (value, row) =>
          `${row.address.street}, ${row.address.suite}, ${row.address.city} ${row.address.zipcode}`,
        sortable: true,
      },
      {
        name: "action",
        align: "left",
        label: "Action",
        field: "",
      },
    ];

    const fetchUsers = async () => {
      isLoading.value = true;
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        users.value = response.data;
      } catch (error) {
        console.error("Error:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const updateUser = async (id, updatedUser) => {
      try {
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          updatedUser
        );
        // Update the user in the users array
        const index = users.value.findIndex((user) => user.id === id);
        if (index !== -1) {
          users.value[index] = response.data;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const deleteUser = async (id) => {
      try {
        isLoading.value = true;
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        // Remove the user from the users array
        users.value = users.value.filter((user) => user.id !== id);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const openEditDialog = (user) => {
      selectedUser.value = { ...user };
      isDialogOpen.value = true;
    };

    const closeEditDialog = () => {
      isDialogOpen.value = false;
    };

    const saveUser = async () => {
      try {
        isLoading.value = true;
        if (selectedUser.value.id) {
          // Update existing user
          await updateUser(selectedUser.value.id, selectedUser.value);
        } else {
          // Add a new user
          const response = await axios.post(
            "https://jsonplaceholder.typicode.com/users",
            {
              name: selectedUser.value.name,
              username: selectedUser.value.username,
              email: selectedUser.value.email,
              address: {
                street: selectedUser.value.address.street,
                suite: selectedUser.value.address.suite,
                city: selectedUser.value.address.city,
                zipcode: selectedUser.value.address.zipcode,
              },
            }
          );
          users.value.push(response.data);
        }
        closeEditDialog();
      } catch (error) {
        console.error("Error:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const openAddDialog = () => {
      selectedUser.value = {
        name: "",
        username: "",
        email: "",
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
        },
      };
      isDialogOpen.value = true;
    };

    const filteredUsers = computed(() => {
      return users.value.filter((user) =>
        user.name.toLowerCase().includes(text.value.toLowerCase())
      );
    });
    // ...

    onMounted(fetchUsers);

    return {
      users: filteredUsers,
      columns,
      updateUser,
      deleteUser,
      openEditDialog,
      closeEditDialog,
      saveUser,
      isDialogOpen,
      selectedUser,
      text,
      filteredUsers,
      openAddDialog,
      isLoading,
    };
  },
};
