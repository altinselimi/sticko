<template>
	<ul>
		<li v-for="(task, index) in tasks" :class="{'finished': !!task.status}">
			<checkbox :task-status.sync="task.status"></checkbox>
			<span>{{task.label}} altin</span>
		</li>
	</ul>
</template>
<script>
import storage from '../ext/storage.js';
import checkbox from './checkbox.vue';

export default {
	components: {
		checkbox,
	},
	computed: {
		storeTasks() {
			return storage.get('__sticko-tasks');
		},
	},
	data: () => ({
		tasks: [{
			label: 'HV-583 - Fix transmission in the right gear of tractor',
			status: false,
		}, {
			label: 'HV-69 - Go hard or go home',
			status: false,
		}, {
			label: 'HV-96 - OK just go home.',
			status: false,
		}],
	}),
};
</script>
<style lang='scss' scoped>
ul {
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