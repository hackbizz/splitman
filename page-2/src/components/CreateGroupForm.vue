<template>
    <v-dialog v-model="dialog" max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
                v-bind="activatorProps"
                v-if="!isCreateGroupButtonHidden && !isMenuHidden"
                variant="outlined"
                elevation="4"
                color="purple-darken-4"
                class="create-group-btn"
            >
                <v-icon left color="purple-darken-4">mdi-plus</v-icon>
                    Create New group
            </v-btn>

            <v-btn
                v-else-if="!isMenuHidden"
                icon
                class="profile-avatar"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </template>
        <v-card>
        <v-card-title>Create New Group</v-card-title>
        <v-card-text>
            <v-form ref="form">
            <v-text-field v-model="groupName" label="Group Name" required></v-text-field>
            <v-textarea v-model="groupDescription" label="Group Description" required></v-textarea>
            <v-file-input v-model="image" label="Upload Image" accept="image/*" required></v-file-input>

            <!-- <v-select
                v-model="favorites"
                :items="participants"
                hint="Select Participants"
                label="Select"
                multiple
                persistent-hint
                searchable
            ></v-select> -->

            <!-- <v-combobox
                v-model="selectedParticipants"
                :items="participants"
                item-title="username"
                item-value="id"
                label="Select participants"
                multiple
                @update:modelValue="searchParticipants"
            ></v-combobox> -->

            <v-autocomplete
              v-model="selectedParticipants"
              :items="participants"
              item-title="username"
              item-value="username"
              label="Search Participants"
              @input="searchParticipants"
              multiple
            ></v-autocomplete>

            <!-- <div class="autocomplete-results">
                <div class="participant" v-for="participant in filteredParticipants" :key="participant" @click="addParticipant(participant)"></div>
                {{ participant }}
                
            </div> -->

            <!-- <v-text-field v-model="searchQuery" label="Search participants" @input="searchParticipants" />

            <v-list>
            <v-list-item v-for="participant in participants" :key="participant.id">
                <v-list-item-action>
                    <v-checkbox v-model="participant.selected" />
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>{{ participant.username }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-title>{{ participant.username }}</v-list-item-title>
            </v-list-item>
            </v-list>
            <v-btn @click="addParticipants">Add Participants</v-btn> -->

          <!-- <div class="selected-participants">
            <div class="participant-chip" v-for="(participant, index) in selectedParticipants" :key="index">
                {{ participant }}
                <span class="remove-participant" @click="removeParticipant(index)">×</span>
            </div>
        </div> -->
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="createGroup">Create</v-btn>
            <v-btn color="error" @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios';
    export default {
        name: "CreateGroupForm",
        props: ['isCreateGroupButtonHidden', 'isMenuHidden', 'windowWidth'],
        data() {
            return {
                dialog: false,
                searchQuery: '',
                groupName: '',
                groupDescription: '',
                image: null,
                selectedParticipants: [],
                participants: [],
            };
        },
        methods: {
            async createGroup() {
                if (this.$refs.form.validate()) {
                    // Form is valid, proceed to submit
                    const formData = new FormData();
                    formData.append('group_name', this.groupName);
                    formData.append('group_description', this.groupDescription);
                    formData.append('GroupImage', this.image);
                    formData.append('participants', JSON.stringify(this.selectedParticipants));
                    formData.append('creator_id', 1)

                    // Send an HTTP request to your backend to save the group details
                    // Example using axios:
                    await axios.post('http://localhost:3000/api/groups/create', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                      .then(response => {
                        // Group created successfully
                        this.$emit('groupCreated', response.data);
                        this.closeDialog();
                      })
                      .catch(error => {
                        console.error('Error creating group:', error);
                      });
                }
            },
            async searchParticipants(event) {
                this.searchQuery = event.target.value;
                
                    if (this.searchQuery.length >= 3){

                      await axios
          .           get(`http://localhost:3000/api/user/users/${this.searchQuery}`)
                      .then((response) => {
                          this.participants = response.data.users;

                          console.log("Participants: " + JSON.stringify(this.participants));
                      })
                      .catch((error) => {
                        console.error("Error fetching participants:", error);
                      });

                        // const response = await axios.get(`http://localhost:3000/api/user/users/${this.searchQuery}`);
                        // const data = await response.data.users;
                        // console.log(JSON.stringify(data))
                        // console.log('first')
                        // this.participants = data;
                    }
                
            },
            addParticipants() {
                this.selectedParticipants = this.participants.filter(participant => participant.selected)
                console.log(this.selectedParticipants)
            },
            closeDialog() {
                this.dialog = false;
            },
        }
    }
</script>

<style scoped>
.create-group-btn {
  margin-right: 16px;
}

.profile-avatar {
  margin-right: 10px; /* Adjust margin as needed */
  margin-left: 16px;
  border: 3px solid #673AB7;
}
</style>