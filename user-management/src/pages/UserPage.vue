<script src="../composables/usersList.js"></script>

<template>
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
        </template>
      </q-table>
    </div>

    <q-dialog v-model="isDialogOpen">
      <q-card class="w-full">
        <q-card-section>
          <q-input label="Name" v-model="selectedUser.name"></q-input>
          <q-input label="Username" v-model="selectedUser.username"></q-input>
          <q-input label="Email" v-model="selectedUser.email"></q-input>
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
