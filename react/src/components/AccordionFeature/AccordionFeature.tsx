import React, { forwardRef } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDownIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import './AccordionFeature.css';
import { Earthquake } from '../../interfaces/earthquakes';
import { ActionAsideFn, ControllerEnum } from '../../interfaces';

interface Props {
	items: Earthquake[];
	action: ActionAsideFn;
}

export const AccordionFeature: React.FC<Props> = ({ items, action }) => {
	const onAction = () => {
		action(ControllerEnum.SHOW_ASIDE);
		action(ControllerEnum.SHOW_COMMENTS);
	};

	if (items.length == 0) {
		return (
			<main className="data-not-found">
				<h2>Data not found</h2>
			</main>
		);
	} else {
		return (
			<Accordion.Root
				className="AccordionRoot"
				type="single"
				defaultValue="item-1"
				collapsible
			>
				{items.map((item, i) => {
					const date = new Date(+item.attribute.time).toLocaleString();
					return (
						<Accordion.Item
							key={item.id}
							className="AccordionItem"
							value={`item-${i + 1}`}
						>
							<AccordionTrigger>{item.attribute.title}</AccordionTrigger>
							<AccordionContent>
								<p>
									<strong>Type:</strong> {item.type}
								</p>
								<p>
									<strong>Magnitude:</strong>
									{` ${
										item.attribute.magnitude
									} ${item.attribute.mag_type.toUpperCase()}`}
								</p>
								<p>
									<strong>Tsunami:</strong>
									{item.attribute.tsunami ? ' risk' : ' no risk'}
								</p>
								<p>
									<strong>Time:</strong> {date}
								</p>
								<p>
									<strong>Place:</strong> {item.attribute.place}
								</p>
								<div className="buttons-container">
									<button
										className="button-comments"
										onClick={() => {
											onAction();
											action(ControllerEnum.ID_COMMENT, item.id);
										}}
									>
										Show Comments
									</button>
									<a className="button-links" href={item.links.external_url}>
										<button>
											More information{' '}
											<ArrowRightIcon className="arrow-right-icon" />
										</button>
									</a>
								</div>
							</AccordionContent>
						</Accordion.Item>
					);
				})}
			</Accordion.Root>
		);
	}
};

const AccordionTrigger = forwardRef<
	HTMLButtonElement,
	React.ComponentPropsWithoutRef<'button'>
>(({ children, className, ...props }, forwardedRef) => (
	<Accordion.Header className="AccordionHeader">
		<Accordion.Trigger
			className={classNames('AccordionTrigger', className)}
			{...props}
			ref={forwardedRef}
		>
			{children}
			<ChevronDownIcon className="AccordionChevron" aria-hidden />
		</Accordion.Trigger>
	</Accordion.Header>
));

const AccordionContent = forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, forwardedRef) => (
	<Accordion.Content
		className={classNames('AccordionContent', className)}
		{...props}
		ref={forwardedRef}
	>
		<div className="AccordionContentText">{children}</div>
	</Accordion.Content>
));
