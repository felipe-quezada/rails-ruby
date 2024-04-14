import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import './PopOverControll.css';
import {
	ActionAsideFn,
	ActionAsideFnPayload,
	ControllerEnum,
} from '../../interfaces';
import { Bounce, toast } from 'react-toastify';

interface Props {
	action: ActionAsideFn;
	perPage: number;
}

export const PopOverControll: React.FC<Props> = ({ action, perPage }) => {
	const [buttonPop, setButtonPop] = useState<string | undefined>(undefined);
	const [perPageSelect, setPerPageSelect] = useState<number>(perPage);
	const [changesDelay, setChangesDelay] = useState<boolean>(false);
	const buttonValue = (value: ActionAsideFnPayload) => value.toUpperCase();
	const onSelectButton = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		if (e.currentTarget.innerText === buttonPop) {
			setButtonPop(undefined);
		} else {
			setButtonPop(e.currentTarget.innerText);
		}
	};
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = +e.target.value;

		if (value > 1000 || value < 0) return;

		setPerPageSelect(value === 0 ? 1 : value);
	};

	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<button className="IconButton" aria-label="Update dimensions">
					<MixerHorizontalIcon />
				</button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					className="PopoverContent"
					side="right"
					sideOffset={50}
					collisionPadding={{ top: 20 }}
				>
					<h6 className="title-popover" style={{ marginBottom: 10 }}>
						Filter Options
					</h6>
					<fieldset className="fieldset">
						<label htmlFor="button-popover">Magnitude type:</label>
						<div className="button-container-popover">
							<button
								onClick={onSelectButton}
								id="button-popover"
								className={`button-popover ${
									buttonPop === 'MB' ? 'active' : ''
								}`}
							>
								{buttonValue(ActionAsideFnPayload.MB)}
							</button>
							<button
								onClick={onSelectButton}
								id="button-popover"
								className={`button-popover ${
									buttonPop === 'MD' ? 'active' : ''
								}`}
							>
								{buttonValue(ActionAsideFnPayload.MD)}
							</button>
							<button
								onClick={onSelectButton}
								id="button-popover"
								className={`button-popover ${
									buttonPop === 'ME' ? 'active' : ''
								}`}
							>
								{buttonValue(ActionAsideFnPayload.ME)}
							</button>
							<button
								onClick={onSelectButton}
								id="button-popover"
								className={`button-popover ${
									buttonPop === 'MI' ? 'active' : ''
								}`}
							>
								{buttonValue(ActionAsideFnPayload.MI)}
							</button>
							<button
								onClick={onSelectButton}
								id="button-popover"
								className={`button-popover ${
									buttonPop === 'ML' ? 'active' : ''
								}`}
							>
								{buttonValue(ActionAsideFnPayload.ML)}
							</button>
							<button
								onClick={onSelectButton}
								id="button-popover"
								className={`button-popover ${
									buttonPop === 'MLG' ? 'active' : ''
								}`}
							>
								{buttonValue(ActionAsideFnPayload.MLG)}
							</button>
							<button
								onClick={onSelectButton}
								id="button-popover"
								className={`button-popover ${
									buttonPop === 'MS' ? 'active' : ''
								}`}
							>
								{buttonValue(ActionAsideFnPayload.MS)}
							</button>
							<button
								onClick={onSelectButton}
								id="button-popover"
								className={`button-popover ${
									buttonPop === 'MW' ? 'active' : ''
								}`}
							>
								{buttonValue(ActionAsideFnPayload.MW)}
							</button>
						</div>
					</fieldset>
					<br />
					<fieldset className="fieldset">
						<label htmlFor="per-page">Features per pages:</label>
						<input
							className="input"
							type="number"
							id="per-page"
							value={perPageSelect}
							onChange={onChange}
						/>
					</fieldset>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							setChangesDelay(true);
							setTimeout(() => setChangesDelay(false), 1500);
							action(ControllerEnum.MAG_TYPE, buttonPop?.toLowerCase());
							action(ControllerEnum.PER_PAGE, perPageSelect);
							toast.info('Applying changes', {
								position: 'bottom-center',
								autoClose: 5000,
								hideProgressBar: true,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
								theme: 'light',
								transition: Bounce,
							});
						}}
						style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
					>
						<div className="popoverClose" aria-label="Close">
							<button disabled={changesDelay}>Apply changes</button>
						</div>
					</form>
					<Popover.Arrow className="PopoverArrow" />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
};
