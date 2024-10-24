export type modalCreateType<T> = {
  baseInfo?: T
  handleUpdateListing: () => void
  modalCreateRowIsOpen: boolean
  setModalCreateRowIsOpen: (e: boolean) => void
}

export type modalEditeType<T> = {
  baseInfo: T
  modalEditRowIsOpen: boolean
  handleUpdateListing: () => void
  setModalEditRowIsOpen: (e: boolean) => void
}

export type modalSeeType = {
  baseInfo: any
  modalSeeRowIsOpen: boolean
  handleUpdateListing: () => void
  setModalSeeRowIsOpen: (e: boolean) => void
}
