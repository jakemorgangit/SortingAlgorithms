let array = [];
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;
let sortButton = document.getElementById('sortButton');
let running = false;

sortButton.addEventListener('click', startSort);
document.getElementById('algorithm').addEventListener('change', startSort);
document.getElementById('arraySize').addEventListener('change', startSort);


function getColor(value, minValue, maxValue) {
    // Calculate the percentage of the value
    var percent = (value - minValue) / (maxValue - minValue);

    // Create an RGB color based on the percentage
    var r = percent * 255;
    var g = 0;
    var b = 255 - (percent * 255);

    // Return the color in CSS format
    return "rgb(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ")";
}


let timeStart;


function startSort() {
    if (running) {
        running = false;
    }
    setTimeout(function() {
        if (!running) {
            let arraySize = document.getElementById('arraySize').value;
            let algorithm = document.getElementById('algorithm').value;
            // Start the timer
            timeStart = Date.now();
            document.getElementById('timeElapsed').innerText = 'Time elapsed: 0ms';
            setInterval(function() {
                if (running) {
                    let timeElapsed = Math.floor((Date.now() - timeStart) );
                    document.getElementById('timeElapsed').innerText = `Time elapsed: ${timeElapsed}s`;
                }
            }, 1);
            generateArray(arraySize);
            running = true;
            displayAlgorithmInfo(algorithm);
            if (algorithm === 'bubbleSort') {
                bubbleSort(array);
            } else if (algorithm === 'selectionSort') {
                selectionSort(array);
            } else if (algorithm === 'quickSort') {
                quickSort(array, 0, array.length - 1);
            } else if (algorithm === 'mergeSort') {
                mergeSort(array, 0, array.length - 1);
            } else if (algorithm === 'insertionSort') {
				insertionSort(array);
			} else if (algorithm === 'heapSort') {
				heapSort(array);
			} else if (algorithm === 'shellSort') {
				shellSort(array);
			} else if (algorithm === 'bucketSort') {
				bucketSort(array);
			} else if (algorithm === 'radixSort') {
				radixSort(array);
			} else if (algorithm === 'countingSort') {
				countingSort(array);
			} else if (algorithm === 'timSort') {
				timSort(array);
			}
        }
    }, 100);
}

document.getElementById('arraySize').addEventListener('input', function() {
    document.getElementById('arraySizeDisplay').innerText = 'Array Size: ' + this.value;
    startSort();
});

function displayAlgorithmInfo(algorithm) {
    let infoBox = document.getElementById('infoBox');
    let infoText;
    switch (algorithm) {
        case 'bubbleSort':
            infoText = 'Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. Best suited for small lists or lists that are almost sorted, but it is inefficient for larger unsorted lists.';
            break;
        case 'quickSort':
            infoText = 'QuickSort is a divide and conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot. There are many versions of quickSort that pick pivot in different ways. It performs well on random data and can sort items of any type for which a "less-than" relation is defined. It is generally considered to be efficient and fast, so it is suitable for large datasets.';
            break;
        case 'mergeSort':
            infoText = 'MergeSort is a divide and conquer algorithm that divides the unsorted list into n sublists, each containing one element (a list of one element is considered sorted), and then repeatedly merges sublists to produce new sorted sublists until there is only one sublist remaining. This algorithm is efficient and works faster than Bubble Sort, especially for larger lists. However, it requires additional space for the temporary arrays used during sorting.';
            break;
        case 'selectionSort':
            infoText = 'Selection sort is a simple sorting algorithm that divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted that occupy the rest of the list. Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest (or largest) element in the unsorted sublist, swapping it with the leftmost unsorted element, and moving the sublist boundaries one element to the right. It is not suitable for large data sets.';
            break;
        case 'insertionSort':
            infoText = 'Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. However, insertion sort provides several advantages: simple implementation, efficient for (quite) small data sets, more efficient than other quadratic sorting algorithms, and adaptive, i.e., efficient for data sets that are already substantially sorted.';
            break;
        case 'heapSort':
            infoText = 'HeapSort is a comparison-based sorting algorithm. Heapsort can be thought of as an improved selection sort that uses a binary heap to find the smallest (or largest) element. Its advantage lies in the ability to perform the selection of the next element to sort in logarithmic time, improving efficiency over selection sort for larger datasets. It is an in-place algorithm, but it is not a stable sort.';
            break;
        case 'shellSort':
            infoText = 'Shell sort is a generalisation of insertion sort that allows the exchange of items that are far apart. It is an in-place comparison sort. Shell sort is a great choice for medium-sized lists and for lists that have already been partially sorted.';
            break;
        case 'bucketSort':
            infoText = 'Bucket sort is a distribution sort, a generalisation of pigeonhole sort, and is a cousin of radix sort in the most-to-least significant digit flavor. It works by distributing the elements of an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sort algorithm. Bucket sort is mainly useful when input is uniformly distributed over a range.';
            break;
        case 'radixSort':
            infoText = 'Radix sort is a non-comparative integer sorting algorithm that sorts data with integer keys by grouping keys by the individual digits which share the same significant position and value. Radix sort can be applied to data that can be sorted lexicographically, be they integers, words, punch cards, playing cards, or the mail.';
            break;
        case 'countingSort':
            infoText = 'Counting sort is an integer sorting algorithm that assumes that the input is an array of integers in a small range. It works by counting the number of objects having distinct key values, and applying arithmetic to calculate the position of each object in the output sequence. Its running time complexity makes it efficient when the range of input values is not significantly greater than the number of values to be sorted.';
            break;
        case 'timSort':
            infoText = 'TimSort is a hybrid stable sorting algorithm, derived from merge sort and insertion sort, designed to perform well on many kinds of real-world data. It uses techniques from Peter McIlroy\'s "Optimistic Sorting and Information Theoretic Complexity", among others. The algorithm finds subsequences of the data that are already ordered, and uses that knowledge to sort the remainder more efficiently. This is done by merging data from smaller to larger runs, to produce new runs that are increasingly larger and increasingly sorted.';
            break;
        default:
            infoText = 'No information available for this algorithm.';
    }
    infoBox.innerText = infoText;
}

function generateArray(size) {
    array = [];
    let barWidth = canvas.width / size;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < size; i++) {
        array.push(Math.random() * canvas.height);
        ctx.fillStyle = '#6c757d';
        ctx.fillRect(i * barWidth, canvas.height - array[i], barWidth, array[i]);
    }
}

async function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len && running; i++) {
        for (let j = 0; j < len - i - 1 && running; j++) {
            if (arr[j] > arr[j + 1]) {
                await delay(100);
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                drawArray(arr, j);
            }
        }
    }
    if (running) running = false;
}

async function selectionSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len && running; i++) {
        let min = i;
        for (let j = i+1; j < len; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min !== i) {
            await delay(100);
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
            drawArray(arr, i);
        }
    }
    if (running) running = false;
}

async function quickSort(arr, low, high) {
    if (low < high && running) {
        let pi = await partition(arr, low, high);
        await Promise.all([quickSort(arr, low, pi - 1), quickSort(arr, pi + 1, high)]);
    }
}

async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = (low - 1);

    for (let j = low; j <= high - 1 && running; j++) {
        if (arr[j] < pivot) {
            i++;
            await delay(100);
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            drawArray(arr, i);
        }
    }
    await delay(100);
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    drawArray(arr, i + 1);
    return (i + 1);
}

async function mergeSort(arr, l, r) {
    if (l < r && running) {
        let m = l + Math.floor((r - l) / 2);
        await mergeSort(arr, l, m);
        await mergeSort(arr, m + 1, r);
        await merge(arr, l, m, r);
    }
}

async function merge(arr, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) {
        L[i] = arr[l + i];
    }

    for (let j = 0; j < n2; j++) {
        R[j] = arr[m + 1 + j];
    }

    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2 && running) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        await delay(100);
        drawArray(arr, k);
        k++;
    }

    while (i < n1 && running) {
        arr[k] = L[i];
        i++;
        k++;
        await delay(100);
        drawArray(arr, k);
    }

    while (j < n2 && running) {
        arr[k] = R[j];
        j++;
        k++;
        await delay(100);
        drawArray(arr, k);
    }
}

// Insertion Sort
async function insertionSort(arr) {
    let len = arr.length;
    for (let i = 1; i < len && running; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key && running) {
            await delay(100);
            arr[j + 1] = arr[j];
            drawArray(arr, j);
            j--;
        }
        arr[j + 1] = key;
        drawArray(arr, i);
    }
    if (running) running = false;
}

// Heap Sort

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}


async function heapify(arr, len, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < len && arr[left] > arr[largest]) largest = left;
    if (right < len && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
        await delay(100);
        swap(arr, i, largest);
        drawArray(arr, largest);
        await heapify(arr, len, largest);
    }
}

async function heapSort(arr) {
    let len = arr.length;
    for (let i = Math.floor(len / 2) - 1; i >= 0 && running; i--) {
        await heapify(arr, len, i);
    }
    for (let i = len - 1; i > 0 && running; i--) {
        await delay(100);
        swap(arr, 0, i);
        drawArray(arr, i);
        await heapify(arr, i, 0);
    }
    if (running) running = false;
}


// Shell Sort
async function shellSort(arr) {
    let len = arr.length;
    for (let gap = Math.floor(len / 2); gap > 0 && running; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < len && running; i++) {
            let temp = arr[i];
            let j;
            for (j = i; j >= gap && arr[j - gap] > temp && running; j -= gap) {
                await delay(100);
                arr[j] = arr[j - gap];
                drawArray(arr, j);
            }
            arr[j] = temp;
            drawArray(arr, i);
        }
    }
    if (running) running = false;
}

// Bucket Sort
async function bucketSort(arr) {
    let minVal = Math.min(...arr);
    let maxVal = Math.max(...arr);
    let bucketCount = Math.floor((maxVal - minVal) / arr.length) + 1;
    let buckets = new Array(bucketCount).fill(0).map(() => []);

    for (let i = 0; i < arr.length; i++) {
        let bucketIndex = Math.floor((arr[i] - minVal) / arr.length);
        buckets[bucketIndex].push(arr[i]);
    }

    for (let i = 0; i < buckets.length; i++) {
        let bucket = buckets[i];
        if (bucket.length > 0) {
            await insertionSort(bucket); // Reuse insertion sort for individual buckets
            for (let j = 0; j < bucket.length; j++) {
                arr[i * bucketCount + j] = bucket[j];
                await delay(100);
                drawArray(arr, i * bucketCount + j);
            }
        }
    }

    if (running) running = false;
}

// Radix Sort
async function countingSortForRadix(arr, exp) {
    let output = new Array(arr.length).fill(0);
    let count = new Array(10).fill(0);

    for (let i = 0; i < arr.length; i++) {
        let index = Math.floor(arr[i] / exp) % 10;
        count[index]++;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        let index = Math.floor(arr[i] / exp) % 10;
        output[count[index] - 1] = arr[i];
        count[index]--;
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
        await delay(100);
        drawArray(arr, i);
    }
}

async function radixSort(arr) {
    let max = Math.max(...arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        await countingSortForRadix(arr, exp);
    }

    if (running) running = false;
}

// Counting Sort
async function countingSort(arr) {
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    // round the values to the nearest integer
    min = Math.round(min);
    max = Math.round(max);
    
    let range = max - min + 1;
    let count = new Array(range).fill(0);
    let output = new Array(arr.length).fill(0);

    for(let i = 0; i < arr.length; i++) {
        count[Math.round(arr[i]) - min]++;
    }

    for(let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    for(let i = arr.length - 1; i >= 0; i--) {
        output[count[Math.round(arr[i]) - min] - 1] = arr[i];
        count[Math.round(arr[i]) - min]--;
    }

    for(let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
        await delay(100);
        drawArray(arr, i);
    }

    if (running) running = false;
}

// Tim Sort
// To keep this manageable, let's use a simple insertion sort for runs
async function insertionSortForTimSort(arr, left, right) {
    for (let i = left + 1; i <= right; i++) {
        let temp = arr[i];
        let j = i - 1;
        while (arr[j] > temp && j >= left) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = temp;
    }
}

async function mergeForTimSort(arr, l, m, r) {
    let len1 = m - l + 1, len2 = r - m;
    let left = new Array(len1), right = new Array(len2);
    for (let x = 0; x < len1; x++) {
        left[x] = arr[l + x];
    }
    for (let x = 0; x < len2; x++) {
        right[x] = arr[m + 1 + x];
    }

    let i = 0, j = 0, k = l;

    while (i < len1 && j < len2) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        await delay(100);
        drawArray(arr, k);
        k++;
    }

    while (i < len1) {
        arr[k] = left[i];
        i++;
        k++;
        await delay(100);
        drawArray(arr, k);
    }

    while (j < len2) {
        arr[k] = right[j];
        j++;
        k++;
        await delay(100);
        drawArray(arr, k);
    }
}

async function timSort(arr) {
    let RUN = 32;
    let n = arr.length;

    for (let i = 0; i < n; i += RUN) {
        await insertionSortForTimSort(arr, i, Math.min((i + 31), (n - 1)));
    }

    for (let size = RUN; size < n; size = 2 * size) {
        for (let left = 0; left < n; left += 2 * size) {
            let mid = Math.min((left + size - 1), (n - 1));
            let right = Math.min((left + 2 * size - 1), (n - 1));
            if(mid < right) {
                await mergeForTimSort(arr, left, mid, right);
            }
        }
    }

    if (running) running = false;
}



function drawArray(arr, currentIdx) {
    let barWidth = canvas.width / arr.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < arr.length; i++) {
        if (i === currentIdx) {
            ctx.fillStyle = '#f00'; // Highlight the current index with red color
        } else {
            ctx.fillStyle = getColor(arr[i], 0, canvas.height);
        }
        ctx.fillRect(i * barWidth, canvas.height - arr[i], barWidth, arr[i]);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
