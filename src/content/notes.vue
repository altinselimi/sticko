<template>
	<ul :class="{'hide': hide}" v-if="tasks && tasks.length > 0">
		<li v-for="(task, index) in tasks" :class="{'finished': !!task.status}">
			<checkbox @update="updateNote($event, task)" :task-value="task.status"></checkbox>
			<span :class="{'no-style': task.dont_style}"><span>{{task.label ? task.label + ' - ' : null}}</span><span>{{task.description}}</span></span>
			<div class="remove" @click="removeNote(task)">
				<remove></remove>
			</div>
		</li>
		<div class="helpers">
			<button @click="hideforasec">HIDE FOR 5 SECONDS</button>
			<button @click="$store.commit('SET_NOTES', {})">CLEAR</button>
		</div>
	</ul>
</template>
<script>
import checkbox from './checkbox.vue';
import { XSquareIcon } from 'vue-feather-icons';

export default {
	components: {
		checkbox,
		remove: XSquareIcon,
	},
	data: () => ({ hide: false }),
	computed: {
		hello() {
			return this.$store.state.hello;
		},
		tasks() {
			return this.$store.getters.notesArr;
		},
		counter() {
			return this.$store.state.count;
		},
	},
	methods: {
		updateNote(status, note) {
			this.$store.commit('SET_NOTE_STATUS', { id: note.id, status: status });
		},
		removeNote(note) {
			console.log('Note tbr:', note);
			this.$store.commit('REMOVE_NOTE', note);
		},
		hideforasec() {
			this.hide = true;
			setTimeout(() => {
				this.hide = false;
			}, 5000)
		},
	},
	watch: {
		hello(newTasks) {
			console.log('My name is hello and things have changed');
		},
	}
};
</script>
<style lang='scss' scoped>
.helpers {
	visibility: hidden;
	display: flex;
	justify-content: space-between;
	font-size: 13px;
}

button {
	-webkit-appearance: none;
	border: none;
	padding: 1px 5px;
	background-color: white;
	color: lighten(black, 10);
	text-decoration: underline;
	font-weight: 600;
	cursor: pointer;
}

.remove {
	visibility: hidden;
	display: flex;
	align-items: center;
	margin-left: 5px;
	margin-left: auto;
	svg {
		width: 15px;
		height: 15px;
		stroke-width: 1px;
	}
}

ul {
	&.hide {
		display: none;
	}
	opacity: .8;
	min-width: 250px;
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
	font-family: "Lato",
	-apple-system,
	BlinkMacSystemFont,
	"Segoe UI",
	Roboto,
	Helvetica,
	Arial,
	sans-serif,
	"Apple Color Emoji",
	"Segoe UI Emoji",
	"Segoe UI Symbol";
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
		>span:not(.no-style)>span:first-child {
			text-transform: uppercase;
		}
		&.finished {
			>span {
				text-decoration: line-through;
				color: rgba(white, .8);
			}
			&:hover .remove {
				visibility: visible;
			}
		}
	}

	&:hover {
		opacity: 1;
		.helpers {
			visibility: visible;
		}
	}
}
</style>