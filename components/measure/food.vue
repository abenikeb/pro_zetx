<template>
  <div class="w-full mx-auto">
    <div class="flex items-center w-full gap-x-2 md:gap-x-5">
      <div class="md:w-1/4 w-2/3">
        <h1 class="mb-2 border-b text-md font-bold">Food data</h1>
      </div>
      <!-- <div
        class="
          flex
          items-center
          animate-bounce
          md:w-1/2
          w-1/3
          gap-x-2
          cursor-pointer
        "
        @click="showInstruction"
      >
        <i class="fa fa-question text-accent"></i>
        <h1 class="text-xs">Need Help?</h1>
      </div> -->
    </div>
    <form @submit.prevent="">
      <!-- Upload section -->
      <div
        class="
          md:block md:mb-2 md:w-full md:shadow-md md:p-5 md:bg-white
          hidden
        "
      >
        <div class="flex justify-between mb-3">
          <h1 class="text-lg mb-2 text-black" for="photo">
            Upload photo of a receipt
          </h1>
          <!-- <label
            for="foodToggle"
            class="flex items-end cursor-pointer ml-5 md:ml-0"
          >
            <div class="relative">
              <input
                id="foodToggle"
                type="checkbox"
                class="sr-only"
                @change="foodSwitch($event)"
              />
              <div
                class="
                  block
                  bg-white
                  border border-black border-opacity-20
                  w-14
                  h-8
                  rounded-full
                "
              ></div>
              <div
                class="
                  dot
                  absolute
                  left-1
                  top-1
                  bg-gray-400
                  w-6
                  h-6
                  rounded-full
                  transition
                "
              ></div>
            </div>
          </label> -->
        </div>
        <div class="w-full inline-flex gap-1 items-center">
          <div class="w-auto h-9 flex gap-x-4">
            <div
              v-for="(entry, index) in foodData"
              :key="index"
              class="w-20 h-14 flex relative cursor-pointer"
              :class="
                selectedEntry !== index
                  ? 'opacity-50'
                  : 'border-2 border-accent rounded-md p-2'
              "
            >
              <img
                v-if="entry.image"
                :src="entry.image.src"
                alt=""
                class="w-full h-full absolute left-0 top-0 bg-gray-800"
                @click.self="setEntry(index)"
                @dblclick.self="$refs.upload.click()"
              />
              <div
                v-else
                class="w-full h-full absolute left-0 top-0 border bg-gray-100"
                @click.self="setEntry(index)"
                @dblclick.self="$refs.upload.click()"
              ></div>
              <i
                class="
                  fa fa-times
                  absolute
                  right-0
                  top-0
                  fill-gray-500
                  bg-white
                  opacity-75
                "
                @click="removeImage(index)"
              ></i>
            </div>
          </div>
          <div class="w-1/6 flex justify-center self-start">
            <div class="px-3 py-2 border rounded-md shadow-md w-full h-full">
              <!-- <label @click="foodSwitchVal ? $refs.upload.click() : _"> -->
              <label @click="$refs.upload.click()">
                <h6 :class="'upload'" class="flex items-center justify-center">
                  <i
                    class="fa inline-block align-middle"
                    :class="
                      selectedEntry === -1 && !primaryImageData
                        ? 'fa-plus'
                        : 'fa-edit'
                    "
                  />
                </h6>
              </label>
              <input
                ref="upload"
                type="file"
                accept="image/*"
                class="hidden"
                @change.prevent="primaryImg"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Upload responsive section -->
      <div class="mb-2 w-full shadow-md p-5 bg-white md:hidden">
        <div class="flex justify-between">
          <h1 class="text-lg mb-2 text-black w-2/3" for="photo">
            Upload photo of a receipt
          </h1>
          <!-- <label
            for="elecToggle"
            class="flex items-end cursor-pointer ml-5 md:ml-0"
          >
            <div class="relative">
              <input
                id="elecToggle"
                type="checkbox"
                class="sr-only"
                @change="foodSwitch($event)"
              />
              <div
                class="
                  block
                  bg-white
                  border border-black border-opacity-20
                  w-14
                  h-8
                  rounded-full
                "
              ></div>
              <div
                class="
                  absolute
                  left-1
                  top-1
                  bg-gray-400
                  w-6
                  h-6
                  rounded-full
                  transition
                "
                :class="{'toggle': foodSwitchVal}"
              ></div>
            </div>
          </label> -->
          <!-- selected responsive receipt image -->
          <div class="flex w-24 h-16">
            <img
              v-if="primaryImageData"
              :src="primaryImageData ? primaryImageData.src : ''"
              class="bg-white w-full h-full"
              alt=""
            />
            <div v-else class="w-full h-full bg-white border"></div>
          </div>
        </div>
        <!-- <div class="w-full inline-flex gap-x-4 items-center mt-3"> -->
        <div class="w-auto h-auto flex flex-wrap gap-x-4 gap-y-3 mt-3">
          <div
            v-for="(entry, index) in foodData"
            :key="index"
            class="w-24 h-14 flex relative cursor-pointer"
            :class="
              selectedEntry !== index
                ? 'opacity-50'
                : 'border-2 border-accent rounded-md p-2'
            "
          >
            <img
              v-if="entry.image"
              :src="entry.image.src"
              alt=""
              class="w-full h-full absolute left-0 top-0 bg-gray-800"
              @click.self="setEntry(index)"
            />
            <div
              v-else
              class="w-full h-full absolute left-0 top-0 border bg-gray-100"
              @click.self="setEntry(index)"
            ></div>
            <i
              class="
                fa fa-times
                absolute
                right-0
                top-0
                fill-gray-500
                bg-white
                opacity-75
              "
              @click="removeImage(index)"
            ></i>
          </div>
          <div class="w-24 h-14 flex justify-center">
            <div class="px-3 py-2 border rounded-md shadow-md w-full h-full">
              <label @click="foodSwitchVal ? $refs.upload.click() : _">
                <h6
                  :class="foodSwitchVal ? 'upload' : 'disabled'"
                  class="flex items-center justify-center"
                >
                  <i
                    class="fa inline-block align-middle"
                    :class="
                      selectedEntry === -1 && !primaryImageData
                        ? 'fa-plus'
                        : 'fa-edit'
                    "
                  />
                </h6>
              </label>
            </div>
            <input
              ref="upload"
              type="file"
              accept="image/*"
              class="hidden"
              @change.prevent="primaryImg"
            />
          </div>
        </div>
        <!-- </div> -->
      </div>
      <!-- selected receipt image -->
      <img
        :src="primaryImageData ? primaryImageData.src : ''"
        class="
          md:block
          hidden
          md:bg-white md:absolute md:w-60 md:h-auto md:right-5 md:-mt-36
        "
        alt=""
      />
      <!-- slider and tab section -->
      <div class="flex flex-col shadow-md w-full p-5 bg-white mt-6">
        <!-- tab section -->
        <div class="flex mt-4 gap-x-5">
          <!-- Animal based -->
          <h1
            :class="
              section === 'Animal products'
                ? 'bg-accent text-white'
                : 'text-black cursor-pointer hover:bg-gray-200'
            "
            class="
              transition
              duration-500
              delay-75
              rounded-lg
              px-6
              py-4
              md:py-1
              self-center
            "
            @click="
              section = 'Animal products'
              subSection = 'chicken'
            "
          >
            Animal products
          </h1>
          <!-- Plant based -->
          <h1
            :class="
              section === 'Plant based'
                ? 'bg-accent text-white'
                : 'text-black cursor-pointer hover:bg-gray-200'
            "
            class="
              transition
              duration-500
              delay-75
              rounded-lg
              px-6
              py-1
              md:py-1
              text-center
              self-center
            "
            @click="
              section = 'Plant based'
              subSection = 'chocolate'
            "
          >
            Plant based
          </h1>
        </div>
        <!-- Animal subsection -->
        <div
          v-if="section === 'Animal products'"
          class="
            md:grid
            md:grid-cols-4
            md:gap-x-4
            md:gap-y-6
            md:place-items-center
            md:mt-8
            hidden
          "
        >
          <div class="tooltip" data-tip="Chicken">
            <img
              src="~/assets/images/measure/chicken.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'chicken' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'chicken'"
            />
          </div>
          <div class="tooltip" data-tip="Pork">
            <img
              src="~/assets/images/measure/pork.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'pork' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'pork'"
            />
          </div>
          <div class="tooltip" data-tip="Sheep">
            <img
              src="~/assets/images/measure/sheep.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'sheep' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'sheep'"
            />
          </div>
          <div class="tooltip" data-tip="Turkey">
            <img
              src="~/assets/images/measure/turkey.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'turkey' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'turkey'"
            />
          </div>
          <div class="tooltip tooltip-bottom" data-tip="Cow">
            <img
              src="~/assets/images/measure/cow.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'cow' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'cow'"
            />
          </div>
          <div class="tooltip tooltip-bottom" data-tip="Milk">
            <img
              src="~/assets/images/measure/milk.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'milk' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'milk'"
            />
          </div>
          <div class="tooltip tooltip-bottom" data-tip="Cheese">
            <img
              src="~/assets/images/measure/cheese.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'cheese' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'cheese'"
            />
          </div>
          <div class="tooltip tooltip-bottom" data-tip="Fish">
            <img
              src="~/assets/images/measure/fish.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'fish' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'fish'"
            />
          </div>
        </div>
        <!-- Animal responsive subsection -->
        <div
          v-if="section === 'Animal products'"
          class="
            flex flex-wrap
            justify-around
            gap-x-4 gap-y-6
            place-items-center
            mt-8
            md:hidden
          "
        >
          <div class="tooltip" data-tip="Chicken">
            <img
              src="~/assets/images/measure/chicken.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'chicken' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-5
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'chicken'"
            />
          </div>
          <div class="tooltip" data-tip="Pork">
            <img
              src="~/assets/images/measure/pork.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'pork' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-5
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'pork'"
            />
          </div>
          <div class="tooltip" data-tip="Sheep">
            <img
              src="~/assets/images/measure/sheep.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'sheep' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-5
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'sheep'"
            />
          </div>
          <div class="tooltip" data-tip="Turkey">
            <img
              src="~/assets/images/measure/turkey.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'turkey' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-5
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'turkey'"
            />
          </div>
          <div class="tooltip" data-tip="Cow">
            <img
              src="~/assets/images/measure/cow.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'cow' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-5
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'cow'"
            />
          </div>
          <div class="tooltip" data-tip="Milk">
            <img
              src="~/assets/images/measure/milk.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'milk' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-5
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'milk'"
            />
          </div>
          <div class="tooltip" data-tip="Cheese">
            <img
              src="~/assets/images/measure/cheese.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'cheese' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-5
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'cheese'"
            />
          </div>
          <div class="tooltip" data-tip="Fish">
            <img
              src="~/assets/images/measure/fish.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'fish' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-5
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'fish'"
            />
          </div>
        </div>
        <!-- Plant subsection -->
        <div
          v-if="section === 'Plant based'"
          class="
            md:grid
            md:grid-cols-4
            md:gap-x-4
            md:gap-y-6
            md:place-items-center
            md:mt-8
            hidden
          "
        >
          <div class="tooltip" data-tip="Chocolate">
            <img
              src="~/assets/images/measure/chocolate.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'chocolate' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'chocolate'"
            />
          </div>
          <div class="tooltip" data-tip="Coffee">
            <img
              src="~/assets/images/measure/coffee.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'coffee' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'coffee'"
            />
          </div>
          <div class="tooltip" data-tip="Rice">
            <img
              src="~/assets/images/measure/rice.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'rice' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'rice'"
            />
          </div>
          <div class="tooltip" data-tip="Green meat">
            <img
              src="~/assets/images/measure/green-meat.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'greenMeat' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'greenMeat'"
            />
          </div>
          <div class="tooltip tooltip-bottom" data-tip="Arteficial Milk">
            <img
              src="~/assets/images/measure/arteficial-milk.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'artificialMilk' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'artificialMilk'"
            />
          </div>
          <div class="tooltip tooltip-bottom" data-tip="Avocado">
            <img
              src="~/assets/images/measure/avocado.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'avocado' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'avocado'"
            />
          </div>
          <div class="tooltip tooltip-bottom" data-tip="Beans">
            <img
              src="~/assets/images/measure/beans.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'beans' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'beans'"
            />
          </div>
          <div class="tooltip tooltip-bottom" data-tip="Tofu">
            <img
              src="~/assets/images/measure/tofu.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'tofu' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'tofu'"
            />
          </div>
        </div>
        <!-- Plant responsive subsection -->
        <div
          v-if="section === 'Plant based'"
          class="
            flex flex-wrap
            justify-around
            gap-x-4 gap-y-6
            place-items-center
            mt-8
            md:hidden
          "
        >
          <div class="tooltip" data-tip="Chocolate">
            <img
              src="~/assets/images/measure/chocolate.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'chocolate' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-4
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'chocolate'"
            />
          </div>
          <div class="tooltip" data-tip="Coffee">
            <img
              src="~/assets/images/measure/coffee.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'coffee' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-4
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'coffee'"
            />
          </div>
          <div class="tooltip" data-tip="Rice">
            <img
              src="~/assets/images/measure/rice.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'rice' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-4
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'rice'"
            />
          </div>
          <div class="tooltip" data-tip="Green meat">
            <img
              src="~/assets/images/measure/green-meat.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'greenMeat' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-4
                rounded-md
                cursor-pointer
                w-24
              "
              @click="subSection = 'greenMeat'"
            />
          </div>
          <div class="tooltip" data-tip="Arteficial milk">
            <img
              src="~/assets/images/measure/arteficial-milk.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'artificialMilk' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-4
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'artificialMilk'"
            />
          </div>
          <div class="tooltip" data-tip="Avocado">
            <img
              src="~/assets/images/measure/avocado.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'avocado' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-4
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'avocado'"
            />
          </div>
          <div class="tooltip" data-tip="Beans">
            <img
              src="~/assets/images/measure/beans.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'beans' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-4
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'beans'"
            />
          </div>
          <div class="tooltip" data-tip="Tofu">
            <img
              src="~/assets/images/measure/tofu.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'tofu' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-4
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'tofu'"
            />
          </div>
        </div>
        <!-- slider section -->
        <div
          class="
            md:flex md:flex-col
            mt-5
            md:justify-center md:items-center md:w-11/12 md:mx-auto
            hidden
          "
        >
          <h1 class="transition duration-500 delay-75 text-md font-bold">
            {{
              subSection !== 'greenMeat' && subSection !== 'artificialMilk'
                ? subSection[0].toUpperCase() + subSection.substring(1)
                : subSection === 'greenMeat'
                ? 'Green Meat'
                : 'Artificail Milk'
            }}

            <span class="text-sm text-gray-600">
              {{
                subSection === 'chicken' ||
                subSection === 'pork' ||
                subSection === 'sheep' ||
                subSection === 'turkey' ||
                subSection === 'cow' ||
                subSection === 'cheese' ||
                subSection === 'fish' ||
                subSection === 'chocolate' ||
                subSection === 'rice' ||
                subSection === 'greenMeat' ||
                subSection === 'avocado' ||
                subSection === 'beans' ||
                subSection === 'tofu'
                  ? '(gram(s))'
                  : '(liter(s))'
              }}
            </span>
          </h1>
          <div class="flex w-full items-center justify-center">
            <div
              v-if="
                subSection === 'milk' ||
                subSection === 'artificialMilk' ||
                subSection === 'coffee'
              "
              class="w-1/10"
            >
              <img src="~/assets/images/measure/foodSliderLiter.svg" alt="" />
            </div>
            <div v-else class="w-1/10">
              <img src="~/assets/images/measure/foodSliderGram.svg" alt="" />
            </div>
            <div class="mx-14 my-5 w-4/5">
              <vue-slider
                :value="
                  foodDataEntry[subSection] > max[subSection]
                    ? max[subSection]
                    : foodDataEntry[subSection]
                "
                :marks="marks"
                :min="min"
                :max="max[subSection]"
                :tooltip-placement="'top'"
                @change="setValue($event)"
              ></vue-slider>
              <!-- :max="max[subSection]" -->
            </div>
            <div
              v-if="
                subSection === 'milk' ||
                subSection === 'artificialMilk' ||
                subSection === 'coffee'
              "
              class="w-1/10 flex"
            >
              <img src="~/assets/images/measure/foodSliderLiter.svg" alt="" />
              <img src="~/assets/images/measure/foodSliderLiter.svg" alt="" />
              <img src="~/assets/images/measure/foodSliderLiter.svg" alt="" />
            </div>
            <div v-else class="w-1/10 flex gap-x-2">
              <img src="~/assets/images/measure/foodSliderGram.svg" alt="" />
              <img src="~/assets/images/measure/foodSliderGram.svg" alt="" />
              <img src="~/assets/images/measure/foodSliderGram.svg" alt="" />
            </div>
          </div>
          <input
            :value="foodDataEntry[subSection]"
            class="mt-5 border rounded-md border-accent text-center"
            type="number"
            @input="setValueInput($event)"
          />
        </div>
        <!-- slider responsive section -->
        <div
          class="
            flex flex-col
            mt-5
            justify-center
            items-center
            w-11/12
            mx-auto
            md:hidden
          "
        >
          <h1 class="transition duration-500 delay-75 text-md font-bold">
            {{
              subSection !== 'greenMeat' && subSection !== 'artificialMilk'
                ? subSection[0].toUpperCase() + subSection.substring(1)
                : subSection === 'greenMeat'
                ? 'Green Meat'
                : 'Artificail Milk'
            }}
            <span class="text-sm text-gray-600">
              {{
                subSection === 'chicken' ||
                subSection === 'pork' ||
                subSection === 'sheep' ||
                subSection === 'turkey' ||
                subSection === 'cow' ||
                subSection === 'cheese' ||
                subSection === 'fish' ||
                subSection === 'chocolate' ||
                subSection === 'rice' ||
                subSection === 'greenMeat' ||
                subSection === 'avocado' ||
                subSection === 'beans' ||
                subSection === 'tofu'
                  ? '(gram(s))'
                  : '(liter(s)))'
              }}
            </span>
          </h1>
          <div class="flex w-full items-center justify-center">
            <div class="my-5 w-full">
              <vue-slider
                :value="
                  foodDataEntry[subSection] > max[subSection]
                    ? max[subSection]
                    : foodDataEntry[subSection]
                "
                :marks="marksResponsive"
                :min="min"
                :max="max[subSection]"
                :tooltip-placement="'top'"
                @change="setValue($event)"
              ></vue-slider>
            </div>
          </div>
          <input
            :value="foodDataEntry[subSection]"
            class="mt-5 border rounded-md border-accent text-center"
            type="number"
            @input="setValueInput($event)"
          />
        </div>
        <!-- submit and skip section -->
        <div
          class="
            md:flex
            md:justify-center
            md:items-center
            md:gap-5
            md:border-t
            md:pt-5
            md:mt-5
            hidden
          "
        >
          <button
            class="
              transition
              duration-150
              bg-gray-300
              rounded-lg
              py-2
              px-3
              text-gray-700
              hover:bg-gray-400
              mt-4
              font-bold
            "
            @click.prevent="
              selectedEntry === -1 ? $emit('sectionSubmit') : reset()
            "
          >
            {{ selectedEntry === -1 ? 'Skip' : 'Cancel' }}
          </button>
          <!-- <button
            class="
              btn btn-sm
              bg-white
              text-gray-700
              hover:bg-gray-200
              mt-4
              font-bold
            "
            @click.prevent="addReceiptTracker"
          >
            {{ selectedEntry === -1 ? 'Add Receipt' : 'Save changes' }}
          </button> -->
          <button
            id="submit"
            class="
              transition
              duration-150
              bg-accent
              rounded-lg
              border border-accent
              py-2
              px-3
              text-white
              hover:bg-green-900 hover:border-green-900
              mt-4
            "
            type="submit"
            @click.prevent="submitFoodData"
          >
            Submit
          </button>
        </div>
        <!-- submit and skip responsive section -->
        <div
          class="
            md:hidden
            flex
            gap-x-5
            justify-center
            items-center
            border-t
            pt-5
            mt-5
          "
        >
          <button
            class="
              border border-gray-300
              transition
              duration-150
              bg-gray-300
              rounded-lg
              py-2
              px-3
              text-gray-700
              hover:bg-gray-400
              mt-4
              font-bold
              text-xs
            "
            @click.prevent="
              selectedEntry === -1 ? $emit('sectionSubmit') : reset()
            "
          >
            {{ selectedEntry === -1 ? 'Skip' : 'Cancel' }}
          </button>
          <!-- <button
            class="
              text-xs
              bg-white
              border
              rounded-md
              border-gray-700
              text-gray-700
              hover:bg-gray-200
              mt-4
              font-bold
              py-2
              px-1
            "
            @click.prevent="addReceiptTracker"
          >
            {{ selectedEntry === -1 ? 'Add Receipt' : 'Save changes' }}
          </button> -->
          <button
            id="submit"
            class="
              text-xs
              transition
              duration-150
              bg-accent
              rounded-lg
              border border-accent
              py-2
              px-2
              text-white
              hover:bg-green-900 hover:border-green-900
              mt-4
            "
            type="submit"
            @click.prevent="submitFoodData"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
    <InstructionModal
      v-if="showModal"
      @close-modal="showModal = false"
      @checked-value="checkedTracker"
      @continue="continueTracker"
    />
  </div>
</template>

<script lang="">
import firebase from 'firebase'
import Vue from 'vue'
import InstructionModal from '../InstructionModal.vue'
export default Vue.extend({
  components: {
    InstructionModal,
  },
  data() {
    return {
      selectedEntry: -1,
      foodSwitchVal: true,
      min: 0,
      max: {
        chicken: 3500,
        pork: 3500,
        sheep: 3500,
        turkey: 3500,
        cow: 3500,
        milk: 3500,
        cheese: 3500,
        fish: 3500,
        chocolate: 3500,
        coffee: 3500,
        rice: 3500,
        greenMeat: 3500,
        artificialMilk: 3500,
        avocado: 3500,
        beans: 3500,
        tofu: 3500,
      },
      marks: {
        0: 'Low',
        1500: 'Middle',
        3500: 'High',
      },
      marksResponsive: {
        0: 'Low',
        1500: 'Average',
        3500: 'High',
      },
      section: 'Animal products',
      subSection: 'chicken',
      uploadingImage: false,
      foodData: [],
      foodDataEntry: {
        image: null,
        measuredOn: new Date().toDateString(),
        status: 'pending',
        chicken: 0,
        pork: 0,
        sheep: 0,
        turkey: 0,
        cow: 0,
        milk: 0,
        cheese: 0,
        fish: 0,
        chocolate: 0,
        coffee: 0,
        rice: 0,
        greenMeat: 0,
        artificialMilk: 0,
        avocado: 0,
        beans: 0,
        tofu: 0,
        factors: {
          // chicken: 6.9,
          // pork: 12.1,
          // sheep: 0,
          // turkey: 10.9,
          // cow: 0,
          // milk: 1.9,
          // cheese: 13.5,
          // fish: 0,
          // chocolate: 0,
          // coffee: 0,
          // rice: 0,
          // greenMeat: 0,
          // artificialMilk: 0,
          // avocado: 0,
          // beans: 0,
          // tofu: 0,
          // beef: 39.2,
          // lamb: 27,
          // tuna: 6.1,
          chicken: 1.82,
          pork: 2.4,
          sheep: 22.25,
          turkey: 10.9,
          cow: 15.5,
          milk: 0.8,
          cheese: 2.79,
          fish: 1.34,
          chocolate: 0.95,
          coffee: 0.4,
          rice: 0.16,
          greenMeat: 7.75,
          artificialMilk: 0.25,
          avocado: 1.08,
          beans: 2,
          tofu: 0.08,
        },

        finalEmissions: {
          chicken: 0,
          pork: 0,
          sheep: 0,
          turkey: 0,
          cow: 0,
          milk: 0,
          cheese: 0,
          fish: 0,
          chocolate: 0,
          coffee: 0,
          rice: 0,
          greenMeat: 0,
          artificialMilk: 0,
          avocado: 0,
          beans: 0,
          tofu: 0,
        },
      },
      primaryImageData: null,
      primaryImageRef: [],
      filesToRemoveFromStorage: [],
      showModal: false,
      showAgain: null,
    }
  },
  computed: {
    images() {
      return this.primaryImageData
    },
  },

  created() {
    if (this.$store.state.measure.foodData) {
      this.foodData = [...this.$store.state.measure.foodData]
    }
    // if (!localStorage.getItem('showStatus')) {
    //   this.showModal = true
    // }
  },

  methods: {
    showInstruction() {
      this.showModal = true
    },
    continueTracker() {
      if (this.showAgain === true) {
        localStorage.setItem('showStatus', true)
        this.showModal = false
      } else {
        this.showModal = false
      }
    },
    addReceiptTracker() {
      // if(localStorage.getItem('showStatus')){
      //   console.log('don\'t show modal');
      // }else{
      //   this.showModal = true
      // }
      this.addReceipt()
    },
    checkedTracker(value) {
      this.showAgain = value
    },
    setEntry(index) {
      this.selectedEntry = index
      this.foodDataEntry = { ...this.foodData[index] }
      this.primaryImageData = this.foodData[index].image
    },
    foodSwitch(event) {
      this.foodSwitchVal = event.target.checked
    },
    addReceipt() {
      if (this.selectedEntry === -1) {
        this.foodDataEntry.image = this.primaryImageData
        this.foodData.push({ ...this.foodDataEntry })
      } else {
        this.foodDataEntry.image = this.primaryImageData
        this.foodData[this.selectedEntry] = { ...this.foodDataEntry }
      }
      // Animal based
      this.foodDataEntry.chicken = 0
      this.foodDataEntry.pork = 0
      this.foodDataEntry.sheep = 0
      this.foodDataEntry.turkey = 0
      this.foodDataEntry.cow = 0
      this.foodDataEntry.milk = 0
      this.foodDataEntry.cheese = 0
      this.foodDataEntry.fish = 0
      // plant based
      this.foodDataEntry.chocolate = 0
      this.foodDataEntry.coffee = 0
      this.foodDataEntry.rice = 0
      this.foodDataEntry.greenMeat = 0
      this.foodDataEntry.artificialMilk = 0
      this.foodDataEntry.avocado = 0
      this.foodDataEntry.beans = 0

      this.selectedEntry = -1
      this.primaryImageData = null
    },

    removeImage(index) {
      this.foodData = this.foodData.filter((_data, index1) => index1 !== index)
      this.reset()
    },
    // uploads multiple images
    async uploadImages() {
      const promises = []
      this.foodData.forEach(async (data, index) => {
        if (data.image && data.image.file) {
          const storageRef = firebase
            .storage()
            .ref()
            .child(data.image.name + new Date().getTime().toString())
          // let file = data.image.file
          const uploadPromise = storageRef
            .put(data.image.file)
            .then(async (snapshot) => {
              const source = await storageRef.getDownloadURL()
              this.primaryImageRef[index] = {
                name: data.image.name,
                src: source,
              }
            })
          promises.push(uploadPromise)
        } else if (data.image && !data.image.file) {
          this.primaryImageRef[index] = {
            name: data.image.name,
            src: data.image.src,
          }
        } else {
          const uploadPromise = async () => {
            await this.primaryImageRef.push({
              name: 'undefined',
              src: 'undefined',
            })
          }
          promises.push(uploadPromise)
        }
      })
      await Promise.all(promises)
    },
    // Captures the file that the user selected
    primaryImg(event) {
      try {
        event.target.files.forEach((fil) => {
          this.primaryImageData = {
            src: URL.createObjectURL(fil),
            file: fil,
            name: fil.name,
          }
        })
      } catch (e) {
        console.log(e)
      }
    },

    setValue(value) {
      this.foodDataEntry[this.subSection] = parseInt(value)
    },
    setValueInput(e) {
      console.log('e', e.target.value)
      this.foodDataEntry[this.subSection] = parseInt(e.target.value)
    },
    async submitFoodData() {
      this.$store.dispatch('loading/toggleLoading', true)
      this.addReceipt()
      await this.uploadImages()
      this.foodData.forEach((data, index) => {
        data.image = this.primaryImageRef[index]
      })
      this.reset()
      this.foodData.forEach((data) => {
        if (data.image === undefined) data.image = null
      })

      this.$store.dispatch('measure/setFoodData', this.foodData)
      this.$emit('sectionSubmit')
      this.$store.dispatch('loading/toggleLoading', false)
    },

    clearFoodDataEntry() {
      this.foodDataEntry = {
        image: null,
        dateMeasured: new Date().toDateString(),
        status: 'pending',
        chicken: 0,
        pork: 0,
        sheep: 0,
        turkey: 0,
        cow: 0,
        milk: 0,
        cheese: 0,
        fish: 0,
        chocolate: 0,
        coffee: 0,
        rice: 0,
        greenMeat: 0,
        artificialMilk: 0,
        avocado: 0,
        beans: 0,
        tofu: 0,
        factors: {
          chicken: 1.82,
          pork: 2.4,
          sheep: 22.25,
          turkey: 10.9,
          cow: 15.5,
          milk: 0.8,
          cheese: 2.79,
          fish: 1.34,
          chocolate: 0.95,
          coffee: 0.4,
          rice: 0.16,
          greenMeat: 7.75,
          artificialMilk: 0.25,
          avocado: 1.08,
          beans: 2,
          tofu: 0.08,
        },
        finalEmissions: {
          chicken: 0,
          pork: 0,
          sheep: 0,
          turkey: 0,
          cow: 0,
          milk: 0,
          cheese: 0,
          fish: 0,
          chocolate: 0,
          coffee: 0,
          rice: 0,
          greenMeat: 0,
          artificialMilk: 0,
          avocado: 0,
          beans: 0,
          tofu: 0,
        },
      }
    },

    // addEntry() {

    // },
    reset() {
      // Animal based
      this.foodDataEntry.chicken = 0
      this.foodDataEntry.pork = 0
      this.foodDataEntry.sheep = 0
      this.foodDataEntry.turkey = 0
      this.foodDataEntry.cow = 0
      this.foodDataEntry.milk = 0
      this.foodDataEntry.cheese = 0
      this.foodDataEntry.fish = 0
      // plant based
      this.foodDataEntry.chocolate = 0
      this.foodDataEntry.coffee = 0
      this.foodDataEntry.rice = 0
      this.foodDataEntry.greenMeat = 0
      this.foodDataEntry.artificialMilk = 0
      this.foodDataEntry.avocado = 0
      this.foodDataEntry.beans = 0

      this.selectedEntry = -1
      this.primaryImageData = null
    },
    removeEntry(index) {
      this.foodData.splice(index, 1)
    },
    async uploadImage(event) {
      this.uploadingImage = true
      const image = event.target.files[0]
      if (!image) {
        return (this.uploadingImage = false)
      }
      if (!image.type.match('image.*')) {
        this.uploadingImage = false
        return alert('Please select an image file')
      }
      const fileName = `mrv/MRV${new Date().getTime()}`
      const imageRef = this.$fire.storage
        .ref()
        .child(`${fileName}.${image.name.split('.').pop()}`)
      try {
        const snapshot = await imageRef.put(image)
        const imageUrl = await snapshot.ref.getDownloadURL()
        this.foodDataEntry.image = imageUrl
        this.uploadingImage = false
      } catch (error) {
        this.uploadingImage = false
        alert(error.message)
      }
    },
  },
})
</script>

<style scoped>
input:checked ~ .dot {
  transform: translateX(100%);
  @apply bg-accent;
}
.form-control {
  @apply w-full md:w-2/5;
}
.toggle {
  transform: translateX(100%);
  @apply bg-accent;
}
.upload {
  @apply border-2 bg-white rounded-full text-accent w-10 h-10 mx-auto text-center cursor-pointer  border-accent;
}
.disabled {
  @apply border-2 bg-white rounded-full text-gray-400 w-10 h-10 mx-auto text-center border-gray-400;
}
</style>
