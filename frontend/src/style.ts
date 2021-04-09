import styled, { createGlobalStyle } from "styled-components";
import "antd/dist/antd.css";
import Title from "antd/lib/typography/Title";

export const GlobalStyle = createGlobalStyle`
	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: Roboto;
	vertical-align: baseline;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
	display: block;
	}
	body {
	line-height: 1;
	}
	ol, ul {
	list-style: none;
	}
	blockquote, q {
	quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
	content: '';
	content: none;
	}
	table {
	border-collapse: collapse;
	border-spacing: 0;
	}
	
	/* customized global */
	.align-center-flex {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container {
		position: absolute;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 100%;
	}

	/* antd overwrites */
	.ant-spin-dot-item {
		background-color: black;
	}
`;

export const ContentWrapper = styled.div`
  padding: 16px;
`;

export const Hoverable = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;
