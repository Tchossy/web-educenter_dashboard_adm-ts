export type modalCreateType = {
  handleUpdateListing: () => void
  modalCreateRowIsOpen: boolean
  setModalCreateRowIsOpen: (e: boolean) => void
}

export type modalEditeType = {
  baseInfo: any
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
