import { TextField } from '@mui/material'
import { ChangeEvent, forwardRef } from 'react'

interface IInput {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
	isDirty?: boolean
	label?: string
	fullWidth?: boolean
	type?: 'filled' | 'outlined' | 'standard'
}

const Input = forwardRef<HTMLInputElement, IInput>(
	(
		{ onChange, isDirty = false, label, fullWidth = false, type = 'standard' },
		ref
	) => {
		return (
			<TextField
				fullWidth={fullWidth}
				error={isDirty}
				inputRef={ref}
				sx={{ marginTop: 2 }}
				label={isDirty ? 'Error' : label}
				variant={type}
				onChange={onChange}
				helperText={isDirty ? 'Fill in the field' : null}
			/>
		)
	}
)

export default Input
