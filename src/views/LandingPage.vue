<template>
  <div>
    <Tab v-on:changeTarget="changeTarget" :initial-state="active" />

    <h1 class="ml-4 mt-4">TOP 10寵物</h1>
    <Spinner v-if="isLoading" />
    <v-sheet v-else class="mx-auto " max-width="800">
      <v-slide-group>
        <v-slide-item
          v-for="pet in topTenList"
          :key="pet.animal_id"
          :initial-pet="pet"
        >
          <v-card class="ma-4" height="200" width="200">
            <v-row class="fill-height" align="center" justify="center">
              <v-img
                class="white--text align-end"
                height="200px"
                :src="pet.album_file"
                lazy-src="https://via.placeholder.com/150"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <h1 class="ml-4 mt-4">全部寵物</h1>
    <Spinner v-if="isLoading" />
    <v-container v-else fluid>
      <v-row>
        <PetCard
          v-for="pet in PetList"
          :key="pet.animal_id"
          :initial-pet="pet"
        />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PetCard from '../components/PetCard'
import Tab from '../components/Tab'
import Spinner from '../components/Spinner'
import axios from 'axios'

const baseURL =
  'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL'
const cors = 'https://cors-anywhere.herokuapp.com/'

export default {
  name: 'LandingPage',
  components: {
    PetCard,
    Tab,
    Spinner,
  },
  data() {
    return {
      PetList: [],
      choosenType: '狗',
      dataCount: 20,
      allData: [],
      topTenList: [],
      isLoading: true,
      active: false,
    }
  },
  created() {
    this.fetchPetList()
    window.addEventListener('scroll', this.handleScroll)
  },

  methods: {
    async fetchPetList() {
      try {
        this.isLoading = true
        const { data, statusText } = await axios.get(`${cors}${baseURL}`)
        if (statusText !== 'OK') return
        this.allData = data
        this.fetchTargetData(this.allData)
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        console.log('fetchPetList', err)
      }
    },
    fetchTargetData(data) {
      let result = data.filter((item) => {
        return item.animal_kind == this.choosenType
      })
      this.PetList = result.slice(0, this.dataCount)
      this.topTenList = result.slice(0, 10)
    },
    handleScroll() {
      this.active = window.scrollY > 152 ? true : false

      if (
        window.scrollY + window.screen.height ===
        document.body.scrollHeight
      ) {
        this.loadMore()
      }
    },
    loadMore() {
      this.dataCount += 20
      this.fetchTargetData(this.allData)
    },
    changeTarget(data) {
      this.choosenType = data
      this.dataCount = 20
      this.fetchTargetData(this.allData)
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
<style lang="scss">
.v-slide-group__wrapper {
  overflow: scroll;
}
.v-card {
  overflow: hidden;
}
</style>
