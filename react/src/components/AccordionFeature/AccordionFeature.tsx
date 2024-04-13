import React, { forwardRef } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import './AccordionFeature.css';
import { Earthquake } from '../../interfaces/earthquakes';

interface Props {
	items: Earthquake[];
}

export const AccordionFeature: React.FC<Props> = ({ items }) => (
	<Accordion.Root
		className="AccordionRoot"
		type="single"
		defaultValue="item-1"
		collapsible
	>
		{items.map((item, i) => {
			return (
				<Accordion.Item className="AccordionItem" value={`item-${i + 1}`}>
					<AccordionTrigger>{item.attribute.title}</AccordionTrigger>
					<AccordionContent>{item.attribute.place}</AccordionContent>
				</Accordion.Item>
			);
		})}
	</Accordion.Root>
);

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
