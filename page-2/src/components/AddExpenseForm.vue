<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" variant="outlined" class="add-expense-btn">
        Add Expense
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Add Expense</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="expenseName"
            label="Expense Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="expenseAmount"
            label="Expense Amount"
            required
          ></v-text-field>
          <v-textarea
            v-model="expenseDescription"
            label="Expense Description"
            required
          ></v-textarea>
          <v-file-input
            v-model="image"
            label="Bill Receipt"
            accept="image/*"
            required
          ></v-file-input>

          <v-select
            v-model="selectedPayer"
            :items="final_participants"
            label="Payer Name"
            required
            @click="searchParticipants"
          ></v-select>

          <v-select
            v-model="selectedParticipants"
            :items="final_participants"
            label="Select Participants"
            multiple
            @click="searchParticipants"
          ></v-select>

          <v-select
            v-model="splitType"
            :items="splitTypes"
            label="Split Type"
            required
          >
          </v-select>

          <!-- Display selected participants if split type is "Percentage" -->
          <v-row v-if="splitType === 'Percentage'">
            <v-col cols="12">
              <h3>Selected Participants</h3>
              <v-row
                v-for="(participantId, index) in selectedParticipants"
                :key="index"
              >
                <v-col cols="4">
                  <span>{{ getParticipantName(participantId) }}</span>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="participant_percentage[index]"
                    label="Percentage"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="addExpense">Add</v-btn>
        <v-btn color="error" @click="closeDialog">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import "../../node_modules/vue3-toastify/dist/index.css";

export default {
  name: "AddExpenseForm",
  props: ["windowWidth", "group_id"],
  data() {
    return {
      dialog: false,
      expenseName: "",
      expenseAmount: "",
      expenseDescription: "",
      image: null,
      selectedParticipants: [],
      participants: [],
      splitType: "",
      splitTypes: ["Equal", "Percentage"],
      selectedPayer: "",
      // payers: ['qwe','wer'] ,
      // group_Id:'',
      participant_percentage: [],
      selectedParticipantsWithAmount: [],
    };
  },
  watch: {
    participant_percentages: {
      handler(newVal) {
        // Do something when participant percentages change
      },
      deep: true, // Watch changes deeply in the array
    },
  },
  methods: {
    async addExpense() {
      // amount: this.expenseAmount / this.selectedParticipants.length,
      if (this.$refs.form.validate()) {
        if (this.splitType == "Equal") {
          console.log("amount  hi");
          this.selectedParticipantsWithAmount = this.selectedParticipants.map(
            (id) => {
              console.log("amount ", id);
              return {
                user_id: id,
                amount: this.expenseAmount / this.selectedParticipants.length,
              };
            }
          );
        } else if (this.splitType == "Percentage") {
          console.log("percentage");
          const totalPercentage = this.participant_percentage.reduce(
            (acc, curr) => acc + parseFloat(curr),
            0
          );
          if (totalPercentage !== 100) {
            toast.error("Total percentage must be 100.");
            return;
          }
          this.selectedParticipantsWithAmount = this.selectedParticipants.map(
            (id, index) => ({
              user_id: id,
              amount:
                (parseFloat(this.expenseAmount) *
                  parseFloat(this.participant_percentage[index])) /
                100,
            })
          );
        }
        console.log(
          "participant with amount ",
          this.selectedParticipantsWithAmount
        );
        // Form is valid, proceed to submit
        const formData = new FormData();
        formData.append("expense_name", this.expenseName);
        formData.append("expense_amount", this.expenseAmount);
        formData.append("expense_description", this.expenseDescription);
        formData.append("ExpenseImage", this.image);
        formData.append("payer_id", this.selectedPayer);
        // formData.append('participants', JSON.stringify(this.selectedParticipants));
        formData.append("split_type", this.splitType);
        formData.append("group_id", this.group_id);
        formData.append(
          "recipients",
          JSON.stringify(this.selectedParticipantsWithAmount)
        );

        const participants = [];

        console.log("selected participants ", this.selectedParticipants);

        // Send an HTTP request to your backend to save the group details
        // Example using axios:
        await axios
          .post("http://localhost:3000/api/expenses/create", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            // Group created successfully
            this.$emit("expenseCreated", response.data);
            this.closeDialog();
            this.$emit("successToast");
            // Reset the form
            this.expenseName = "";
            this.expenseAmount = "";
            this.expenseDescription = "";
            this.image = null;
            this.selectedPayer = null;
            this.selectedParticipants = [];
            this.selectedParticipantsWithAmount = [];
            this.splitType = null;
            this.group_id = null;
            this.participants = [];
          })
          .catch((error) => {
            console.error("Error creating expense:", error);
          });
      }
    },
    created() {
      const id = parseInt(this.$route.params.id);
      this.group_Id = id;

      // Listen for window resize event
      window.addEventListener("resize", this.handleWindowResize);
    },
    destroyed() {
      // Remove event listener on before destroy
      window.removeEventListener("resize", this.handleWindowResize);
    },
    async searchParticipants() {
      {
        const id = parseInt(this.$route.params.id);
        this.group_Id = id;

        await axios
          .get(`http://localhost:3000/api/groups/groupMembers/${id}`)
          .then((response) => {
            this.participants = response.data.members;
            // this.participants = response.data.members[1].name;
            console.log(this.participants);
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

    closeDialog() {
      this.dialog = false;
    },
    getParticipantName(participantId) {
      const participant = this.final_participants.find(
        (participant) => participant.value === participantId
      );
      return participant ? participant.title : "Unknown";
    },
  },
  computed: {
    final_participants() {
      return this.participants.map((data) => ({
        title: data.username,
        value: data.id,
      }));
    },
  },
};
</script>

<style scoped>
.add-expense-btn {
  margin-right: 2px; /* Adjust margin as needed */
  margin-left: 10px;
}

.profile-avatar {
  margin-right: 10px; /* Adjust margin as needed */
  margin-left: 16px;
  border: 3px solid #673ab7;
}
</style>
