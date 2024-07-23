const bubbleSort = async (array, setArray, setActiveIndices, setSortedIndices, setIsSorting, stopSortingRef, sortSpeed) => {
  let arr = [...array];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (stopSortingRef.current) return;
      setActiveIndices([j, j + 1]);
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);
      }
      await new Promise((r) => setTimeout(r, sortSpeed));
    }
    setSortedIndices((prev) => [...prev, arr.length - i - 1]);
  }
  setSortedIndices([...Array(arr.length).keys()]);
  setIsSorting(false);
};

export default bubbleSort;
