<template>
    <v-app class="appbar">    
      <AppBar
        :search="search"
        :isCreateGroupButtonHidden="isCreateGroupButtonHidden"
        :isMenuHidden="isMenuHidden"
        :username="username"
        :windowWidth="windowWidth"
        :drawer="drawer"
        @toggleDrawer="toggleDrawer"
      />
      <NavBar :drawer="drawer" :key="drawer" />
      <v-main>
        <v-container>
          <GroupCard :groups="groups" />
        </v-container>
      </v-main>
      <!-- <v-app-bar class="header" app :elevation="1">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>SplitMan</v-toolbar-title>
        <v-spacer></v-spacer>
  
        <v-text-field
          v-model="search"
          label="Search..."
          hide-details
          append-icon="mdi-magnify"
          @click:append="searchItems"
          class="search-field"
          outlined
        ></v-text-field>
        <v-spacer></v-spacer>
  
        <v-btn
          v-if="!isCreateGroupButtonHidden && !isMenuHidden"
          variant="outlined"
          elevation="4"
          color="purple-darken-4"
          class="create-group-btn"
          @click="createNewGroup"
        >
          <v-icon left color="purple-darken-4">mdi-plus</v-icon>
          Create New Group
        </v-btn>
        <v-btn
          v-else-if="!isMenuHidden"
          icon
          class="profile-avatar"
          @click="createNewGroup"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
  
        <v-btn 
          v-if="!isMenuHidden"
          icon 
          class="profile-avatar" 
          size="42"
        >
          <v-icon>mdi-bell</v-icon>
        </v-btn>
  
        <v-menu
          v-if="!isMenuHidden"
        >
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar class="profile-avatar">
                <img src="https://picsum.photos/536/354" alt="Profile Image" />
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="handleProfileClick">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>Profile</v-list-item-content>
            </v-list-item>
            <v-list-item @click="handleLogoutClick">
              <v-list-item-icon>
                <v-icon>mdi-logout-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-content>Logout</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <span class="username">{{ username }}</span>
        <v-spacer></v-spacer>
  
        Dropdown menu for Create Group, Notification, and Profile
        <v-menu bottom left offset-y
          v-if="isMenuHidden"
        >
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
            <v-btn icon v-bind="props">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="createNewGroup">
              <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>Create New Group</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-bell</v-icon>
              </v-list-item-icon>
              <v-list-item-content>Notifications</v-list-item-content>
            </v-list-item>
            <v-list-item @click="handleProfileClick">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>Profile</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
  
      </v-app-bar> -->
  
      <!-- <v-navigation-drawer app  v-model="drawer"> 
        <v-list class="navi-items">
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Dashboard"
            link to="/"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-box"
            title="Friends"
            link to="/"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-group"
            title="Groups"
            link to="/"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-calendar-clock"
            title="Activity"
            link to="/"
          ></v-list-item>
          <v-list-item 
            prepend-icon="mdi-cog" 
            title="Settings"
            link to="/"
            ></v-list-item>
          <v-list-item
            prepend-icon="mdi-logout-variant"
            title="Logout"
            link to="/"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer> -->
  
      <!-- <v-main>
        <v-container>
          <v-card class="mx-auto my-8" elevation="16" max-width="1000">
            <v-card v-for="group in groups" :key="group.name" link to="/">
              <v-card-title>
                <v-avatar color="grey lighten-1" class="mr-4">
                  </v-avatar>
                <span class="group-name">{{ group.name }}</span>
                <div class="group-details-container" :class="{ 'vertical-align': isTextVerticalAlign }">
                  <span class="group-detail">Amount Owed: ₹{{ group.amountOwed }}</span>
                  <span class="group-detail-divider" :class="{ 'vertical-divider': windowWidth > 800, 'horizontal-divider': windowWidth <= 800 }">|</span>
                  <span class="group-detail">Amount Owed To You: ₹{{ group.amountOwedToYou }}</span>
                  <span class="group-detail-divider" :class="{ 'vertical-divider': windowWidth > 800, 'horizontal-divider': windowWidth <= 800 }">|</span>
                  <span class="group-detail">Total Balance Spent in Group: ₹{{ group.totalBalance }}</span>
                </div>
              </v-card-title>
            </v-card>
          </v-card>
        </v-container>
      </v-main> -->
    </v-app>
  </template>
  
  <script>
  import NavBar from './NavBar.vue';
  import AppBar from './AppBar.vue';
  import GroupCard from './GroupCard.vue';
  import axios from 'axios'
  
  export default {
    name: "GroupList",
    components: {
      NavBar,
      AppBar,
      GroupCard
    },
    data() {
      return {
        drawer: false,
        search: "",
        username: "Deepanshu Dixit",
        participants: [],
        groups: [],
        windowWidth: window.innerWidth
      };
    },
    computed: {
      isCreateGroupButtonHidden() {
        return this.windowWidth <= 800; // Adjust breakpoint as needed
      },
      isTextVerticalAlign() {
        return this.windowWidth <= 800; // Adjust breakpoint as needed
      },
      isMenuHidden() {
        return this.windowWidth <= 426; // Adjust breakpoint as needed
      }
    },
    created() {
      // Fetch group information from backend API
      this.fetchGroups();
      this.fetchParticipants();
  
      // Keep nav bar open on mounting for larger screens
      if (this.windowWidth > 960) {
        this.drawer = true;
      }
  
      // Listen for window resize event
      window.addEventListener('resize', this.handleWindowResize);
    },
    destroyed() {
      // Remove window resize event listener to prevent memory leaks
      window.removeEventListener('resize', this.handleWindowResize);
    },
    methods: {
      async fetchGroups() {
        // Fetch groups data from backend API
        // Example:
        await axios.get('http://localhost:3000/api/groups/usersGroups/1')
          .then(response => {
            this.groups = response.data.members;
          })
          .catch(error => {
            console.error('Error fetching groups:', error);
          });
  
        // // For now, using dummy data
        // this.groups = [
        //   { name: "Group 1", amountOwed: 5000, amountOwedToYou: 7600, totalBalance: 2600 },
        //   { name: "Group 2", amountOwed: 3000, amountOwedToYou: 5400, totalBalance: 2400 },
        //   // Add more groups as needed
        // ];
      },
      fetchParticipants() {
        // Fetch participants data from backend API
        // Example:
        // axios.get('/api/participants')
        //   .then(response => {
        //     this.participants = response.data;
        //   })
        //   .catch(error => {
        //     console.error('Error fetching participants:', error);
        //   });
  
        // For now, using dummy data
        this.participants = [
          { text: 'Participant 1', value: 'participant1' },
          { text: 'Participant 2', value: 'participant2' },
          // Add more participants as needed
        ];
      },
      toggleDrawer() {
        this.drawer = !this.drawer;
        console.log('Drawer state:', this.drawer);
      },
      // createNewGroup() {
      //   // Logic for creating a new group
      //   console.log("Create New Group")
      // },
      // searchItems() {
      //   // Implement search functionality here
      //   console.log("Searching for:", this.search);
      // },
      // handleProfileClick() {
      //   // Here you can define the actions to be performed when the Profile option is clicked
      //   console.log("Profile clicked");
      //   // this.$router.push('/profile');
      // },
      // handleLogoutClick() {
      //   // Here you can define the actions to be performed when the Logout option is clicked
      //   console.log("Logout clicked");
      //   // this.$store.dispatch('logout');
      //   // this.$router.push('/login');
      // },
      handleWindowResize() {
        // Update window width on resize
        this.windowWidth = window.innerWidth;
      }
    }
  };
  
  </script>
  
  <style scoped>
  /* .search-field {
    width: 300px; Adjust width as needed
    border: 1px solid #a32323; Border color and thickness
    border-radius: 8px; Border radius
  } */
  /* .create-group-btn {
    margin-right: 16px;
  } */
  /* .profile-avatar {
    margin-right: 10px; Adjust margin as needed
    margin-left: 16px;
    border: 3px solid #673AB7;
  }  */
  /* .navi-items {
    font-size: 25px;
    margin-top: 40px;
  } */
  .appbar {
    background-color: #e7d3eb;
    display: flex;
  }
  
  /* media queries
  .header {
    display: flex;
  }
  
  .username {
    @media (max-width: 896px) {
      display: none;
    }
  } */
  
  /* New styles for group details and vertical dividers */
  /* .group-details-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap; Added to allow wrapping of group detail text
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
  
  Media query for smaller screens
  @media (max-width: 800px) {
    .group-details-container {
      flex-direction: column; Change direction to column for smaller screens
    }
  
    .group-detail-divider.vertical-divider {
      display: none; Hide vertical dividers on smaller screens
    }
    
    .group-detail-divider.horizontal-divider {
      margin-right: 0; Remove right margin for horizontal dividers
      margin-left: 0; Remove left margin for horizontal dividers
      display: inline-block; Change display to inline-block for horizontal dividers
      width: 10px; Set width for horizontal dividers
      height: 1px; Set height for horizontal dividers
      background-color: grey; Set background color for horizontal dividers
    }
  } */
  </style>
  