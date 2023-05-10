import { ChangeEvent, useState } from 'react'

export const useCheckAuthValues = () => {
	const [roomIdIsDirty, setRoomIdIsDirty] = useState<boolean>(false)
	const [nicknameIsDirty, setNicknameIsDirty] = useState<boolean>(false)

	const checkNickname = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.value === '' ? setNicknameIsDirty(true) : setNicknameIsDirty(false)
	}

	const checkRoomId = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.value === '' ? setRoomIdIsDirty(true) : setRoomIdIsDirty(false)
	}

	return {
		checkNickname,
		checkRoomId,
		roomIdIsDirty,
		nicknameIsDirty
	}
}
