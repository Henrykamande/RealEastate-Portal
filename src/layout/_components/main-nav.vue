<template>
  <section>
    <!-- start of sidebar -->
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item :to="item.link">
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.link"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" :to="item.link">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          
        </template>
         <v-list-group
        :value="true"
        prepend-icon="mdi-keyboard"
        sub-group
      >
        <template v-slot:activator>
                      <v-list-item-content>

          <v-list-item-title>Reports</v-list-item-title>
                      </v-list-item-content>

        </template>

          <v-list-item
            v-for="([title, icon], i) in reports"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>



      </v-list>
    </v-navigation-drawer>
    <!-- end of sidebar -->

    <!-- start of appbar -->
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">EnviaNet</span>
      </v-toolbar-title>
      <v-spacer />
      <span style="font-weight: bold">Welcome, {{ name }}</span>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn text color="white" @click="logout">Logout</v-btn>
    </v-app-bar>
    <!-- end of appbar -->
  </section>
</template>

<script>
export default {
  computed: {
    name() {
      return localStorage.getItem("name");
    },
  },
  data: () => ({
    drawer: true,
    reports: [
        ['Invoices', 'mdi-account-multiple-outline'],
        ['Payments', 'mdi-cog-outline'],
      ],
    items: [
      { icon: "mdi-contacts", text: "Properties", link: "/packages" },
      { icon: "mdi-keyboard", text: "Tenants", link: "/products" },
      { icon: "mdi-keyboard", text: "Water Readings", link: "/waterreadings" },
      { icon: "mdi-keyboard", text: "Electricity Readings", link: "/electricityreadings" },

      { icon: "mdi-keyboard", text: "Utilities", link: "/services" },
      { icon: "mdi-keyboard", text: "Settings", link: "/settings" },


      //{ icon: "mdi-keyboard", text: "Slider Manager", link: "/slider" },
      //{ icon: "mdi-keyboard", text: "Blog", link: "/blog" },
      //{ icon: "mdi-keyboard", text: "SEO", link: "/seo" },
      // { icon: "mdi-keyboard", text: "Widgets", link: "/modelo" },
      // { icon: "mdi-keyboard", text: "Pages", link: "/pago" },
      //{ icon: "mdi-keyboard", text: "Locations", link: "/location" },
      { icon: "mdi-keyboard", text: "Users", link: "/users" },
     // { icon: "mdi-keyboard", text: "Reports", link: "/services" },

      // { icon: "mdi-keyboard", text: "Section", link: "/sector" },
      // { icon: "mdi-keyboard", text: "Sectionb", link: "/sectorb" },
    ],
  }),
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      this.$router.push("/login");
    },
  },
};
</script>

