<template>
  <div class="product">
    <div class="container">
      <div class="row mt-5">
        <div class="col-10">
          <div class="text-left pb-5">
            <button class="btn bcustom-primary bblue" @click="newModal">
              Add new
              <i class="fas fa-plus fa-fw"></i>
            </button>
          </div>
        </div>
        <div class="col-12">
          <div class="card">
            <div class="card-header menu-title-wrapper">
              <div class="card-title mb-0">Posts Table</div>
            </div>
            <div class="card-body table-responsive p-0">
              <table class="table table-hover">
                <tbody>
                  <tr>
                    <th>id</th>
                    <th>Title</th>
                    <th>Short Description</th>
                    <th>Description</th>
                    <th>Modify</th>
                  </tr>

                  <tr v-for="post in posts" :key="post.id">
                    <td>{{ post.id }}</td>
                    <td>{{ post.title }}</td>
                    <td>{{ post.short_description }}</td>
                    <td>{{ post.description }}</td>
                    <td width="150">
                      <button class="btn btn-primary">
                        <a href="#" @click="editModal(post)">
                          <i class="fa fa-edit white"></i>
                        </a>
                      </button> /
                      <button class="btn btn-danger">
                        <a href="#" @click="deletePost(post.id)">
                          <i class="fa fa-trash white"></i>
                        </a>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="card-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade addNew"
      id="addNew"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addNewLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header modal-wrapper-title">
            <div class="modal-title" v-show="!editmode" id="addNewLabel">Add New Post</div>
            <div class="modal-title" v-show="editmode" id="addNewLabel">Update Post Info</div>
            <button type="button" class="close" data-dimiss="modal" aria-label="Close">
              <span class="white">&times;</span>
            </button>
          </div>
          <form @submit.prevent="editmode ? updatePost() : createPost()">
            <div class="modal-body">
              <div class="form-group">
                <input
                  v-model="form.title"
                  type="text"
                  class="form-control"
                  name="title"
                  placeholder="Enter Title"
                  :class="{ 'is-invalid': form.errors.has('title') }"
                />
                <has-error :form="form" field="title"></has-error>
              </div>
              <div class="form-group">
                <input
                  v-model="form.short_description"
                  type="text"
                  class="form-control"
                  name="short_description"
                  placeholder="Enter short_description"
                  :class="{ 'is-invalid': form.errors.has('short_description') }"
                />
                <has-error :form="form" field="type"></has-error>
              </div>
              <div class="form-group">
                <vue-editor
                  v-model="form.description"
                  placeholder="Enter Description"
                  :class="{ 'is-invalid': form.errors.has('description') }"
                />
                <has-error :form="form" field="description"></has-error>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn bcustom-primary bred" data-dimiss="modal">Close</button>
              <button type="submit" v-show="editmode" class="btn bcustom-primary bblue">Update</button>
              <button type="submit" v-show="!editmode" class="btn bcustom-primary bgreen">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import axios from "axios";

export default {
  data() {
    const token = localStorage.usertoken;
    const decoded = jwtDecode(token);
    return {
      editmode: false,
      posts: {},
      form: new Form({
        id: decoded.id,
        user_id: "",
        title: "",
        short_description: "",
        description: ""
      }),
      user_id: decoded.id,
    };
  },
  methods: {
    createPost() {
      this.form
        .post("api/posts")
        .then(() => {
          Fire.$emit("AfterCreate");
          $("#addNew").modal("hide");

          toast.fire({
            type: "success",
            title: "Posts Created in successfully"
          });
        })
        .catch(err => {
          console.log(err);
          swal.fire("Failed!", "There was something wrong.", "warning");
        });
    },
    editModal(post) {
      this.editmode = true;
      this.form.reset();
      $("#addNew").modal("show");
      this.form.fill(post);
    },
    updatePost(e) {
      this.form.put("api/posts/" + this.form.id).then(() => {
        $("#addNew").modal("hide");
        swal.fire("Updated!", "Information has been updated", "success");
        Fire.$emit("AfterCreate");
      });
    },
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
            this.form
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
    newModal() {
      this.editmode = false;
      $("#addNew").modal("show");
    },
    loadPosts() {
      axios.get("api/posts/" + this.user_id).then(({ data }) => (this.posts = data));
    }
  },

  created() {
    this.loadPosts();
    Fire.$on("AfterCreate", () => {
      this.loadPosts();
    });
  }
};
</script>