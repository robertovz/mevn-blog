<template>
  <div>
    <div class="posts-wrapper py-3">
      <div class="col-12">
        <div class="card p-4">
          <div class="card-body">
            <div class="d-flex justify-content-between sort-filter">
              <form>
                <div class="mt-4 mb-3 ml-5 text-left">
                  <span>Showing {{posts.length}} results.</span>
                </div>
              </form>
              <form class="input-group-prepend d-block text-left mx-3 my-2 float-right">
                <label class="mr-sm-2" for="inlineFormCustomSelectQuantity">Show:</label>
                <select
                  class="custom-select mr-sm-2"
                  id="inlineFormCustomSelectQuantity"
                  @change="itemsPage()"
                  v-model="itemsPerPage"
                >
                  <option value="1" selected>1</option>
                  <option value="2">2</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 py-1 mx-auto" v-for="post in posts" :key="post.id">
        <div class="card p-4">
          <div class="px-3">
            <div class="card-user mb-2">
              <div class="row">
                <div class="col-lg-1 col-md-2">
                  <img
                    src="../../assets/img/profile/profile.png"
                    class="card-img-top my-2"
                    alt="User picture"
                    style="max-width: 100px;"
                  />
                </div>
                <div class="col-lg-11 col-md-10">
                  <div class="user-info">
                    <a
                      href="#"
                      class="font-weight-bold black dropdown-user"
                      @click="changed(post.user_id)"
                    >{{ post.name}} {{ post.last_name}}</a>
                    <router-link
                      :to="{ name: 'Details', 
                    params: { p_post: post }}"
                      class="ml-3 text-muted"
                    >{{ post.created }}</router-link>
                    <button
                      class="btn btn-outline float-right"
                      v-if="post.user_id == form.user_id || type == 'admin'"
                      @click="deletePost(post.id)"
                    >
                      <i class="fas fa-trash red"></i>
                    </button>
                  </div>
                  <div class="card-text pb-2">
                    <div class="text-muted mb-3" v-html="post.description"></div>
                    <span class="post-item mx-2">
                      <i class="far fa-heart"></i>
                      Likes({{ post.total_ratings }})
                    </span>
                    <span class="post-item">
                      <i class="far fa-comment"></i>
                      Comments({{ post.total_comments }})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import axios from "axios";

export default {
  props: ["posts"],
  data() {
    return {
      user: localStorage.usertoken,
      user_id: "",
      form: new Form({
        user_id: "",
        name: "",
        last_name: "",
        id: "",
        title: "",
        short_description: "",
        description: ""
      }),
      items: this.$route.params.posts,
      type: "",
      itemsPerPage: ""
    };
  },

  methods: {
    deletePost(id) {
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: "true",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            axios
              .delete("api/posts/" + id)
              .then(() => {
                swal.fire("Deleted!", "Your file has been deleted.", "success");
                Fire.$emit("AfterCreate");
              })
              .catch(() => {
                swal.fire("Failed!", "There was something wrong.", "warning");
              });
          }
        });
    },

    changed(id) {
      this.$emit("changed", id);
    }
  },

  created() {
    if (this.user !== undefined && this.user !== null && this.user !== "") {
      const decoded = jwtDecode(this.user);
      this.form.user_id = decoded.id;
      this.form.name = decoded.first_name;
      this.form.last_name = decoded.last_name;
      this.type = decoded.type;
    }
  }
};
</script>

<style lang="scss">
.post-item {
  color: #6c757d;
  float: right;

  &:hover {
    cursor: pointer;
    color: #e3342f !important;
  }
}

.breadcrumb {
  background: #f1f2f9;
}

@media screen and (max-width: 767px) {
  .posts-wrapper {
    text-align: center !important;

    .post-item {
      margin-top: 15px;
      float: none;
    }
  }
}
</style>