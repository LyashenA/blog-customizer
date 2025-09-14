import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState, useEffect } from 'react';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';

export type Options = {
	fontFamily: string;
	fontSize: string;
	fontColor: string;
	containerWidth: string;
	backgroundColor: string;
};

type ArticleParamsFormProps = {
	paramsState: Options;
	setParamsState: React.Dispatch<React.SetStateAction<Options>>;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	paramsState,
	setParamsState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const asideRef = useRef<HTMLElement | null>(null);
	const handleButtonOpen = () => {
		setIsMenuOpen(!isMenuOpen);
		asideRef.current?.classList.toggle(styles.container_open);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply();
	};

	const handleReset = () => {
		onReset();
	};

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
				asideRef.current.classList.remove(styles.container_open);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleButtonOpen} />
			<aside className={styles.container} ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={
							fontFamilyOptions.find(
								(o) => o.value === paramsState.fontFamily
							) || null
						}
						options={fontFamilyOptions}
						onChange={(option) =>
							setParamsState((prev) => ({ ...prev, fontFamily: option.value }))
						}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={
							fontSizeOptions.find((o) => o.value === paramsState.fontSize)!
						}
						onChange={(option) =>
							setParamsState((prev) => ({ ...prev, fontSize: option.value }))
						}
					/>
					<Select
						title='Цвет текста'
						selected={
							fontColors.find((o) => o.value === paramsState.fontColor) || null
						}
						options={fontColors}
						onChange={(option) =>
							setParamsState((prev) => ({ ...prev, fontColor: option.value }))
						}
					/>
					<Separator />
					<Select
						title='Фон'
						selected={
							backgroundColors.find(
								(o) => o.value === paramsState.backgroundColor
							) || null
						}
						options={backgroundColors}
						onChange={(option) =>
							setParamsState((prev) => ({
								...prev,
								backgroundColor: option.value,
							}))
						}
					/>
					<Select
						title='Ширина контейнера'
						selected={
							contentWidthArr.find(
								(o) => o.value === paramsState.containerWidth
							) || null
						}
						options={contentWidthArr}
						onChange={(option) =>
							setParamsState((prev) => ({
								...prev,
								containerWidth: option.value,
							}))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
