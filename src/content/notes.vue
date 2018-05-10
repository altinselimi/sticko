<template>
	<ul :class="{'hide': hide}" v-if="tasks && tasks.length > 0">
		<li v-for="(task, index) in tasks" :class="{'finished': !!task.status}">
			<checkbox @update="updateNote($event, task)" :task-value="task.status"></checkbox>
			<span :class="{'no-style': task.dont_style}"><span>{{task.label ? task.label + ' - ' : null}}</span><span>{{task.description}}</span></span>
		</li>
		<li @click="hideforasec"><span style="margin: 0 auto; cursor:pointer;">HIDE FOR 5 SECONDS</span></li>
	</ul>
</template>
<script>
import checkbox from './checkbox.vue';

export default {
	components: {
		checkbox,
	},
	data: () => ({ hide: false }),
	computed: {
		hello() {
			return this.$store.state.hello;
		},
		tasks() {
			return this.$store.getters.notesArr;
		},
	},
	methods: {
		updateNote(status, note) {
			this.$store.commit('SET_NOTE_STATUS', {id: note.id, status: status});
		},
		hideforasec() {
			this.hide = true;
			setTimeout(() => {
				this.hide = false;
			}, 5000)
		},
	},
};
</script>
<style lang='scss' scoped>
ul {
	&.hide {
		display: none;
	}
	opacity: .8;
	max-width: 330px;
	font-size: 14px;
	position: fixed;
	margin: 0px;
	padding: 0px;
	top: 10px;
	right: 10px;
	list-style: none;
	z-index: 9999999;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	-moz-font-feature-settings: "liga" on;
	box-sizing: border-box;
	font-family: "Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	font-weight: 400;
	li {
		background-color: black;
		color: white;
		padding: 10px 15px;
		margin-bottom: 4px;
		display: flex;
		align-items: center;
		>span {
			margin-left: 10px;
		}
		>span:not(.no-style) > span:first-child{
			text-transform: uppercase;
		}
		&.finished {
			>span {
				text-decoration: line-through;
				color: rgba(white, .8);
			}
		}
	}

	&:hover {
		opacity: 1;
	}
}
</style>