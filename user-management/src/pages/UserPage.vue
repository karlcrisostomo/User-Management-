<script src="../composables/usersList.js"></script>

<template>
  <div>
    <q-input standout v-model="text" label="standout" />
  </div>

  <div>
    <div class="mt-6">
      <q-table flat bordered class="q-pa-md" :rows="users" :columns="columns">
        <template #body-cell-action="props">
          <q-td :props="props">
            <q-btn
              dense
              flat
              round
              color="blue"
              field="edit"
              icon="edit"
              @click="openEditDialog(props.row)"
            ></q-btn>
          </q-td>

          <q-td :props="props">
            <q-btn
              class="-ml-5"
              dense
              flat
              color="blue"
              field="delete"
              icon="delete"
              @click="deleteUser(props.row.id)"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="isDialogOpen">
      <q-card class="w-full">
        <q-card-section>
          <q-input label="Name" v-model="selectedUser.name"></q-input>
          <q-input label="Username" v-model="selectedUser.username"></q-input>
          <q-input label="Email" v-model="selectedUser.email"></q-input>
          <q-input
            label="Street"
            v-model="selectedUser.address.street"
          ></q-input>
          <q-input label="Suite" v-model="selectedUser.address.suite"></q-input>
          <q-input label="City" v-model="selectedUser.address.city"></q-input>
          <q-input
            label="Zipcode"
            v-model="selectedUser.address.zipcode"
          ></q-input>
          <!-- Add other fields as needed -->
        </q-card-section>
        <q-card-section align="center">
          <q-btn label="Cancel" @click="closeEditDialog"></q-btn>
          <q-btn label="Save" color="primary" @click="saveUser"></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>

  <q-btn
    color="primary"
    icon="heart"
    label="Navigate To Leaves"
    @click="$router.push('./leave')"
  />
</template>

<style></style>
