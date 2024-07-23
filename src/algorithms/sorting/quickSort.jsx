const quickSort = async (array, setArray, setActiveIndices, setSortedIndices, setPivotIndex, setIsSorting, stopSortingRef, sortSpeed) => {
  const quickSortHelper = async (arr, left, right) => {
    if (left < right) {
      const pivotIndex = await partition(arr, left, right);
      await quickSortHelper(arr, left, pivotIndex - 1);
      await quickSortHelper(arr, pivotIndex + 1, right);
    }
    if (left === 0 && right === arr.length - 1) {
      setSortedIndices([...Array(arr.length).keys()]);
      setIsSorting(false);
    }
    return arr;
  };

  const partition = async (arr, left, right) => {
    const pivot = arr[right];
    setPivotIndex(right);
    let i = left - 1;

    for (let j = left; j < right; j++) {
      if (stopSortingRef.current) return;
      setActiveIndices([j, i + 1]);
      await new Promise((r) => setTimeout(r, sortSpeed));
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
      }
    }

    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    setArray([...arr]);
    await new Promise((r) => setTimeout(r, sortSpeed));
    setPivotIndex(-1);
    setSortedIndices((prev) => [...prev, i + 1]);
    return i + 1;
  };

  await quickSortHelper(array, 0, array.length - 1);
};

export default quickSort;
