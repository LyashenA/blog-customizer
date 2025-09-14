import { CSSProperties, useState } from 'react';
import { ArticleParamsForm } from './components/article-params-form';
import { Article } from './components/article';
import { Options } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const defaultOptions: Options = {
	fontFamily: defaultArticleState.fontFamilyOption.value,
	fontSize: defaultArticleState.fontSizeOption.value,
	fontColor: defaultArticleState.fontColor.value,
	containerWidth: defaultArticleState.contentWidth.value,
	backgroundColor: defaultArticleState.backgroundColor.value,
};

export const App = () => {
	const [articleState, setArticleState] = useState<Options>(defaultOptions);
	const [paramsState, setParamsState] = useState<Options>(defaultOptions);

	return (
		<main
			className={styles.main}
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
