import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const selectedUser = ref(null);
    const isDialogOpen = ref(false);

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
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        users.value = response.data;
      } catch (error) {
        console.error("Error:", error);
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
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        // Remove the user from the users array
        users.value = users.value.filter((user) => user.id !== id);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // ...
    const openEditDialog = (user) => {
      selectedUser.value = { ...user };
      isDialogOpen.value = true;
    };

    const closeEditDialog = () => {
      isDialogOpen.value = false;
    };

    const saveUser = async () => {
      try {
        await updateUser(selectedUser.value.id, selectedUser.value);
        closeEditDialog();
      } catch (error) {
        console.error("Error:", error);
      }
    };
    // ...

    onMounted(fetchUsers);

    return {
      users,
      columns,
      updateUser,
      deleteUser,
      openEditDialog,
      closeEditDialog,
      saveUser,
      isDialogOpen,
      selectedUser,
    };
  },
};
