<template>
  <div class="hello">
    <h1>Rozpoznawacz płci</h1>
    <h2>Wpisz imię:</h2>
    <input v-model="firstname" @keyup.enter="checkName" />
    <button @click="checkName">Wyślij</button>
    <span class="err">{{ err }}</span>
    <h3>{{ polishGender }}</h3>
  </div>
</template>

<script>
export default {
  name: 'GenderChecker',
  data: function () {
    return {
      firstname: '',
      gender: '',
      err: '',
      polishGenders: {
        'male': 'mężczyzna',
        'female': 'kobieta'
      }
    }
  },
  computed: {
    polishGender: function () {
      return this.polishGenders[this.gender]
    }
  },
  methods: {
    checkName: function () {
      this.gender = ''
      this.err = ''
      if (this.firstname === '') {
        this.err = 'Imię musi być wpisane!!!'
        return
      }
      fetch('https://api.genderize.io/?name=' + this.firstname)
        .then(resp => {
          if (resp.status !== 200) {
            return
          }
          return resp.json()
        })
        .then(data => {
          if (data.gender) {
            this.gender = data.gender
          } else {
            this.err = 'Nie odnaleziono imienia'
          }
        })
        .catch(err => {
          this.err = "Usługa nie działa"
          console.error(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

.err {
    color: red;
}
</style>
