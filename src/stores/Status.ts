import { ref } from 'vue'

export const useStatusButton = () => {
  const check = ref<boolean>(false)

  const handleChangeStatus = (value: boolean) => {
    check.value = value
  }
  return { check, handleChangeStatus }
}
