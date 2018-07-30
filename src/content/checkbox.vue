<template>
	<div class="custom-check-wrapper">
		<input type="checkbox" :value="taskValue" @change="statusEmit" />
		<button class="plain-btn custom-icon" :class="{'checked': !!taskValue}">
			<check-icon v-if="taskValue" />
			<circle-icon />
		</button>
	</div>
</template>
<script>
import { CircleIcon, CheckIcon } from 'vue-feather-icons';

export default {
	components: {
		CircleIcon,
		CheckIcon,
	},
	props: ['taskValue'],
	methods: {
		statusEmit(event) {
			this.$emit('update', !this.taskValue);
		},
	}
};
</script>
<style lang="scss" scoped>
.custom-check-wrapper {
	width: 15px;
	height: 15px;
	position: relative;
	flex-shrink: 0;
	.custom-icon {
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 0;
	}
}

input {
	opacity: 0;
	z-index: 1;
	position: relative;
}

svg {
	width: 15px;
	height: 15px;
	box-sizing: border-box;
	&.feather-check {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		padding: 4px;
	}
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
	&.plain-btn {
		background-color: transparent;
		padding: 0px;
		text-decoration: none;
		color: inherit;
	}
	&:hover, &:focus, &:active {
		transform: scale(1.03);
		border: solid 1px rgba(white, .004);
	}
}
</style>