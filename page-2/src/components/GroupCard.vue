<template>
  <v-card class="mx-auto my-8 ma-8" elevation="16" max-width="1000" style="background-color:#e7d3eb">
    <v-card
      v-for="group in groups"
      :key="group.group_id"
      @click="goToChat(group)"
      class="rounded-e-xl mx-auto ma-4 pa-2 ml-4 mr-4" elevation="16"
    >
      <v-card-title>
        <v-avatar class="mr-4">
          <img :src="group.group_icon" alt="Profile Image" />
        </v-avatar>
        <router-link to="/group-chat">
          <span class="group-name">{{ group.group_name }}</span>
        </router-link>
        <div
          class="group-details-container"
          :class="{ 'vertical-align': isTextVerticalAlign }"
        >
          <span class="group-detail">Amount Owed: ₹{{ group.amountOwed }}</span>
          <span
            class="group-detail-divider"
            :class="{
              'vertical-divider': windowWidth > 800,
              'horizontal-divider': windowWidth <= 800,
            }"
            >|</span
          >
          <span class="group-detail"
            >Amount Owed To You: ₹{{ group.amountOwedToYou }}</span
          >
          <span
            class="group-detail-divider"
            :class="{
              'vertical-divider': windowWidth > 800,
              'horizontal-divider': windowWidth <= 800,
            }"
            >|</span
          >
          <span class="group-detail"
            >Total Balance Spent in Group: ₹{{ group.totalBalance }}</span
          >
        </div>
      </v-card-title>
    </v-card>
  </v-card>
</template>

<script>
import router from '../routers.js'

import { useRouter } from "vue-router";
    export default {
        name: "GroupCard",
        data() {
    return {
      router: useRouter(),
    };
  },
        props: ['groups', 'isTextVerticalAlign', 'windowWidth'],
        methods: {
            goToChat(group) {
            // Navigate to the Chat component
            this.router.push({path:`/group-chat/${group.group_id}`});
            }
        }
    }
</script>

<style scoped>
/* New styles for group details and vertical dividers */
.group-details-container {
  display: flex;
  align-items: center;
  /* flex-wrap: wrap; Added to allow wrapping of group detail text */
}

.group-detail {
  margin-right: 5px;
}

.group-detail-divider {
  margin-right: 5px;
  margin-left: 5px;
  color: grey;
}

.group-name {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

/* Media query for smaller screens */
@media (max-width: 800px) {
  .group-details-container {
    flex-direction: column; /* Change direction to column for smaller screens */
  }

  .group-detail-divider.vertical-divider {
    display: none; /* Hide vertical dividers on smaller screens */
  }

  .group-detail-divider.horizontal-divider {
    margin-right: 0; /* Remove right margin for horizontal dividers */
    margin-left: 0; /* Remove left margin for horizontal dividers */
    display: inline-block; /* Change display to inline-block for horizontal dividers */
    width: 10px; /* Set width for horizontal dividers */
    height: 1px; /* Set height for horizontal dividers */
    background-color: grey; /* Set background color for horizontal dividers */
  }
}
</style>
