
  const AddUpdateToken = {
    props: ['object', 'title'],
    data () {
      return {
        id: this.object ? this.object.id : null,
        clientId: this.object ? this.object.clientId : '',
        token: this.object ? this.object.token : '',
        userFid: this.object ? this.object.userFid : '',
        active: this.object ? this.object.active : true
      }
    },
    methods: {
      save() {
        this.$emit('save-token', { id: this.id, clientId: this.clientId, token: this.token, userFid: this.userFid, active: this.active })
        if (!this.id) {
          this.clientId = ''
          this.token = ''
          this.userFid = ''
        }
      }
    },
    template: `
      <form class="form" @submit.prevent="save">
        <h3 class='subtitle'>{{ title }}</h3>
        <div class="field">
            <label>Pardot User Id</label>
            <div class="control">
              <input class="input" type="text" v-model="clientId">
            </div> 
        </div>
        <div class="field">
            <label>Token</label>
            <div class="control">
              <input class="input" type="text" v-model="token">
            </div> 
        </div>
        <div class="field">
            <label>Salesforce User Id</label>
            <div class="control">
              <input class="input" type="text" v-model="userFid">
            </div> 
        </div>
        <div class="field">
            <div class="control">
              Token Active : 
              <input class="checkbox" type="checkbox" v-model="active"> 
            </div> 
        </div>
        <div class="field">
            <div class="control">
              <button class="button is-success">Save</button>
            </div> 
        </div>
      </form>
    `
  }

  const Token = {
    props: ['token'],
    components: { 'add-update-token': AddUpdateToken },
    data () {
      return {
        showDetail: false
      }
    },
    methods: {
      onAddOrUpdateToken(token) {
        this.$emit('save-token', token)
      },
      deleteToken (token) {
        this.$emit('delete-token', token)
      }
    },
    template: `
      <div class="card">
        <header class="card-header">
          <p @click="showDetail = !showDetail" class="card-header-title">
            <span class="icon-text">
              <span>{{ token.token }}</span>
              <span  v-show="!showDetail"  class="icon">
                <i v-if="token.active" class="fa fa-check-square"></i>
                <i v-else class="fa fa-xing-square"></i>
              </span>
            </span>
          </p>
          <a class="card-header-icon" @click.stop="deleteToken(token)">
            <span class="icon">
              <i class="fa fa-trash"></i>
            </span>
          </a>
        </header>
        <div v-show="showDetail" class="card-content">
            <add-update-token title="Details" :object="token" @save-token="onAddOrUpdateToken" />
        </div>
      </div>
    `
  }

  new Vue({
    el: '#app',
    components: { token: Token, 'add-update-token': AddUpdateToken },
    data: {
      tokens: [],
      apiURL: '/api/tokens',
      count: 0,
      notification: true
    },
    methods: {
        onClick() {
        this.notification = false;
      },
      onAddOrUpdateToken (token) {
        if (token.id) {
          this.updateToken(token)
        } else {
          this.addToken(token)
        }
      },
      addToken (token) {
        return axios.post(this.apiURL, token)
          .then((response) => {
            const copy = this.tokens.slice()
            copy.push(response.data)
            this.tokens = copy
          })
      },
      updateToken (token) {
        return axios.put(`${this.apiURL}/${token.id}`, token)
          .then((response) => {
            const copy = this.tokens.slice()
            const idx = copy.findIndex((c) => c.id === response.data.id)
            copy[idx] = response.data
            this.tokens = copy
          })
      },
      deleteToken (token) {
        console.log('deleting', token)
        return axios.delete(`${this.apiURL}/${token.id}`)
          .then((response) => {
            let copy = this.tokens.slice()
            const idx = copy.findIndex((c) => c.id === token.id)
            copy.splice(idx, 1)
            this.tokens = copy
          })
      }
    },
    beforeMount () {
      axios.get(this.apiURL)
        .then((response) => {
          this.tokens = response.data
        })
        if (localStorage.notification) {
            this.notification = localStorage.notification
        } else {
            this.notification = true;
        }
    },
    watch: {
        notification(newValue) {
            localStorage.notification = newValue;
        }
    }
  })