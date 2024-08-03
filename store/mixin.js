import { mapState } from 'vuex'
import store from "@/store"

const $uStoreKey = store.state ? Object.keys(store.state) : []

module.exports = {
	created() {
		this.$u.vuex = (name, value) => {
			this.$store.commit('$uStore', {
				name,
				value
			})
		}
	},
	computed: {
		...mapState($uStoreKey)
	}
}
