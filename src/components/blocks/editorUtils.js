export const inputCls =
  "w-full px-3 py-2 text-[13px] bg-white dark:bg-[#1a1a1a] dark:text-white border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black dark:focus:ring-white placeholder:text-gray-400";

export const inputFlexCls =
  "flex-1 px-3 py-2 text-[13px] bg-white dark:bg-[#1a1a1a] dark:text-white border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-black dark:focus:ring-white placeholder:text-gray-400";

export const inputMonoCls =
  inputCls + " font-mono";

export const textareaCls =
  inputCls + " resize-y font-sans";

export const textareaMonoCls =
  inputCls + " resize-y font-mono";

export const labelCls = "block text-[12px] font-medium text-gray-700 dark:text-gray-300 mb-1";
export const labelNoMbCls = "block text-[12px] font-medium text-gray-700 dark:text-gray-300";
export const subLabelCls = "block text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-0.5";
export const addBtnCls = "text-[12px] font-medium text-black dark:text-white hover:text-black/80 dark:hover:text-white/80";
export const removeBtnCls =
  "text-[12px] font-medium text-red-500 hover:text-red-600";
export const removeIconCls =
  "p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors";
export const cardCls =
  "space-y-2 p-3 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-lg";

export function createHelpers(setContent) {
  function handleChange(key, value) {
    setContent((prev) => ({ ...prev, [key]: value }));
  }

  function handleArrayChange(arrKey, index, field, value) {
    setContent((prev) => {
      const newArr = [...prev[arrKey]];
      const item = newArr[index];
      if (item !== null && typeof item === "object") {
        newArr[index] = { ...item, [field]: value };
      } else {
        newArr[index] = value;
      }
      return { ...prev, [arrKey]: newArr };
    });
  }

  function handleArrayRemove(arrKey, index) {
    setContent((prev) => ({
      ...prev,
      [arrKey]: prev[arrKey].filter((_, i) => i !== index),
    }));
  }

  function handleArrayAdd(arrKey, defaultItem) {
    setContent((prev) => ({
      ...prev,
      [arrKey]: [...prev[arrKey], defaultItem],
    }));
  }

  return { handleChange, handleArrayChange, handleArrayRemove, handleArrayAdd };
}
