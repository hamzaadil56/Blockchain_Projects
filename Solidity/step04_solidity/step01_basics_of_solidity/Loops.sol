// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Loop {
    function loop() public pure {
        //ignore pure keyword we will discuss it later.
        // for loop
        for (uint i = 0; i < 10; i++) {
            if (i == 3) {
                // Skip to next iteration with continue
                continue;
            }
            if (i == 5) {
                // Exit loop with break
                break;
            }
        }

        // while loop
        uint j;
        while (j < 10) {
            j++;
        }
    }
}
//ignore pure keyword we will discuss it later
