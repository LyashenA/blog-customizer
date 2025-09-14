import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	Options,
} from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const defaultOptions: Options = {
	fontFamily: defaultArticleState.fontFamilyOption.value,
	fontSize: defaultArticleState.fontSizeOption.value,
	fontColor: defaultArticleState.fontColor.value,
	containerWidth: defaultArticleState.contentWidth.value,
	backgroundColor: defaultArticleState.backgroundColor.value,
};

const App = () => {
	const [articleState, setArticleState] = useState<Options>(defaultOptions);
	const [paramsState, setParamsState] = useState<Options>(defaultOptions);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--bg-color': articleState.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm
				paramsState={paramsState}
				setParamsState={setParamsState}
				onApply={() => setArticleState(paramsState)}
				onReset={() => {
					setParamsState(defaultOptions);
					setArticleState(defaultOptions);
				}}
			/>
			<Article theme={articleState} />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
