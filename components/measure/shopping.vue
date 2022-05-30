<template>
  <div class="w-full mx-auto">
    <div class="flex items-center w-full gap-x-2 md:gap-x-5">
      <div class="md:w-1/4 w-2/3">
        <h1 class="mb-2 border-b text-md font-bold">Shopping data</h1>
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
            for="elecToggle"
            class="flex items-end cursor-pointer ml-5 md:ml-0"
          >
            <div class="relative">
              <input
                id="elecToggle"
                type="checkbox"
                class="sr-only"
                @change="shoppingSwitch($event)"
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
        <div class="w-full inline-flex gap-x-4 items-center">
          <div class="w-auto h-auto flex flex-wrap gap-x-4 gap-y-3">
            <div
              v-for="(entry, index) in shoppingData"
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
              <!-- <label @click="shoppingSwitchVal ? $refs.upload.click() : _"> -->
              <label @click="$refs.upload.click()">
                <h6
                  :class="shoppingSwitchVal ? 'upload' : 'disabled'"
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
                @change="shoppingSwitch($event)"
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
                :class="{'toggle': shoppingSwitchVal}"
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
            v-for="(entry, index) in shoppingData"
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
              <label @click="shoppingSwitchVal ? $refs.upload.click() : _">
                <h6
                  :class="shoppingSwitchVal ? 'upload' : 'disabled'"
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
          <!-- plastic -->
          <h1
            :class="
              section === 'plastic'
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
              section = 'plastic'
              subSection = 'waterBottle'
            "
          >
            Plastic
          </h1>
          <!-- non-plastic -->
          <h1
            :class="
              section === 'non-plastic'
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
              section = 'non-plastic'
              subSection = 'books'
            "
          >
            Non-Plastic
          </h1>
        </div>
        <!-- plastic subsection -->
        <div
          v-if="section === 'plastic'"
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
          <div class="tooltip" data-tip="Water Bottle">
            <img
              src="~/assets/images/measure/water-bottle.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'waterBottle' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'waterBottle'"
            />
          </div>
          <div class="tooltip" data-tip="Juice">
            <img
              src="~/assets/images/measure/juice.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'juice' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'juice'"
            />
          </div>
          <div class="tooltip" data-tip="Soft Drink">
            <img
              src="~/assets/images/measure/soft-drink.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'softdrink' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'softdrink'"
            />
          </div>
          <div class="tooltip" data-tip="Shampoo">
            <img
              src="~/assets/images/measure/shampoo.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'shampoo' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'shampoo'"
            />
          </div>
          <div class="tooltip tooltip-bottom" data-tip="Plastic Container">
            <img
              src="~/assets/images/measure/Plastic-container.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'plasticContainer' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'plasticContainer'"
            />
          </div>
          <div class="tooltip tooltip-bottom" data-tip="Tv and Computer">
            <img
              src="~/assets/images/measure/tv-and-computer.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'tvAndComputer' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'tvAndComputer'"
            />
          </div>
          <div class="tooltip tooltip-bottom" data-tip="Bags">
            <img
              src="~/assets/images/measure/bags.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'bags' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'bags'"
            />
          </div>
          <div class="tooltip tooltip-bottom" data-tip="Car spare parts">
            <img
              src="~/assets/images/measure/car-spare-parts.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'carSpareParts' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'carSpareParts'"
            />
          </div>
        </div>
        <!-- plastic responsive subsection -->

        <div
          v-if="section === 'plastic'"
          class="
            flex flex-wrap
            justify-around
            gap-x-4 gap-y-6
            place-items-center
            mt-8
            md:hidden
          "
        >
          <div class="tooltip" data-tip="Water Bottle">
            <img
              src="~/assets/images/measure/water-bottle.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'waterBottle' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-5
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'waterBottle'"
            />
          </div>
          <div class="tooltip" data-tip="Juice">
            <img
              src="~/assets/images/measure/juice.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'juice' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-5
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'juice'"
            />
          </div>
          <div class="tooltip" data-tip="Soft Drink">
            <img
              src="~/assets/images/measure/soft-drink.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'softdrink' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-5
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'softdrink'"
            />
          </div>
          <div class="tooltip" data-tip="Shampoo">
            <img
              src="~/assets/images/measure/shampoo.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'shampoo' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-5
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'shampoo'"
            />
          </div>
          <div class="tooltip" data-tip="Plastic Container">
            <img
              src="~/assets/images/measure/Plastic-container.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'plasticContainer' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-5
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'plasticContainer'"
            />
          </div>
          <div class="tooltip" data-tip="Tv and Computer">
            <img
              src="~/assets/images/measure/tv-and-computer.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'tvAndComputer' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-5
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'tvAndComputer'"
            />
          </div>
          <div class="tooltip" data-tip="Bags">
            <img
              src="~/assets/images/measure/bags.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'bags' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-5
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'bags'"
            />
          </div>
          <div class="tooltip" data-tip="Car spare parts">
            <img
              src="~/assets/images/measure/car-spare-parts.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'carSpareParts' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-5
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'carSpareParts'"
            />
          </div>
        </div>
        <!-- non-plastic subsection -->
        <div
          v-if="section === 'non-plastic'"
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
          <div class="tooltip" data-tip="Books">
            <img
              src="~/assets/images/measure/books.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'books' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'books'"
            />
          </div>
          <div class="tooltip" data-tip="Tissue paper">
            <img
              src="~/assets/images/measure/tissue-paper.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'tissuePaper' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'tissuePaper'"
            />
          </div>
          <div class="tooltip" data-tip="Paper">
            <img
              src="~/assets/images/measure/paper.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'paper' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'paper'"
            />
          </div>
          <div class="tooltip" data-tip="Medcine">
            <img
              src="~/assets/images/measure/medcine.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'medicine' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'medicine'"
            />
          </div>
          <div class="tooltip tooltip-bottom" data-tip="Dress">
            <img
              src="~/assets/images/measure/dress.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'dress' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'dress'"
            />
          </div>
          <div class="tooltip tooltip-bottom" data-tip="Shoes">
            <img
              src="~/assets/images/measure/shoes.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'shoes' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'shoes'"
            />
          </div>
          <div class="tooltip tooltip-bottom" data-tip="Torso">
            <img
              src="~/assets/images/measure/torso.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'torso' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'torso'"
            />
          </div>
          <div class="tooltip tooltip-bottom" data-tip="Trouser">
            <img
              src="~/assets/images/measure/throuser.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'trouser' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-6
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'trouser'"
            />
          </div>
        </div>
        <!-- non-platic responsive subsection -->
        <div
          v-if="section === 'non-plastic'"
          class="
            flex flex-wrap
            justify-around
            gap-x-4 gap-y-6
            place-items-center
            mt-8
            md:hidden
          "
        >
          <div class="tooltip" data-tip="Books">
            <img
              src="~/assets/images/measure/books.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'books' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-4
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'books'"
            />
          </div>
          <div class="tooltip" data-tip="Tissue paper">
            <img
              src="~/assets/images/measure/tissue-paper.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'tissuePaper' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-4
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'tissuePaper'"
            />
          </div>
          <div class="tooltip" data-tip="Paper">
            <img
              src="~/assets/images/measure/paper.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'paper' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-4
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'paper'"
            />
          </div>
          <div class="tooltip" data-tip="Medcine">
            <img
              src="~/assets/images/measure/medcine.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'medicine' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-4
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'medicine'"
            />
          </div>
          <div class="tooltip" data-tip="Dress">
            <img
              src="~/assets/images/measure/dress.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'dress' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-4
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'dress'"
            />
          </div>
          <div class="tooltip" data-tip="Shoes">
            <img
              src="~/assets/images/measure/shoes.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'shoes' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-4
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'shoes'"
            />
          </div>
          <div class="tooltip" data-tip="Torso">
            <img
              src="~/assets/images/measure/torso.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'torso' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-4
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'torso'"
            />
          </div>
          <div class="tooltip" data-tip="Trouser">
            <img
              src="~/assets/images/measure/throuser.svg"
              alt=""
              :class="{ 'bg-accent': subSection === 'trouser' }"
              class="
                transition
                duration-500
                delay-75
                py-1
                px-4
                rounded-md
                cursor-pointer
              "
              @click="subSection = 'trouser'"
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
              subSection !== 'tvAndComputer' &&
              subSection !== 'plasticContainer' &&
              subSection !== 'waterBottle' &&
              subSection !== 'carSpareParts' &&
              subSection !== 'tissuePaper'
                ? subSection[0].toUpperCase() + subSection.substring(1)
                : subSection === 'tvAndComputer'
                ? 'Tv and Computer'
                : subSection === 'plasticContainer'
                ? 'Plastic Container'
                : subSection === 'waterBottle'
                ? 'Water Bottle'
                : subSection === 'carSpareParts'
                ? 'Car Spare Parts'
                : 'Tissue Paper'
            }}
          </h1>
          <div class="flex w-full items-center justify-center">
            <div class="w-1/10">
              <img src="~/assets/images/measure/shopping-slider.svg" alt="" />
            </div>
            <div class="mx-14 my-5 w-4/5">
              <vue-slider
                :value="
                  shoppingDataEntry[subSection] > 1000
                    ? 1000
                    : shoppingDataEntry[subSection]
                "
                :marks="marks"
                :min="min"
                :max="max[subSection]"
                :tooltip-placement="'top'"
                @change="setValue($event)"
              ></vue-slider>
              <!-- :max="max[subSection]" -->
            </div>
            <div class="w-1/10 flex gap-x-2">
              <img src="~/assets/images/measure/shopping-slider.svg" alt="" />
              <img src="~/assets/images/measure/shopping-slider.svg" alt="" />
              <img src="~/assets/images/measure/shopping-slider.svg" alt="" />
            </div>
            <!-- v-model="shopping.waterBottle" -->
          </div>
          <div class="flex w-full gap-x-4 justify-center items-center">
            <h1 class="font-bold text-sm text-center mt-5">£</h1>
            <input
              :value="shoppingDataEntry[subSection]"
              class="mt-5 border rounded-md border-accent text-center"
              type="number"
              @input="setValueInput($event)"
            />
          </div>
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
          </h1>
          <div class="flex w-full items-center justify-center">
            <div class="my-5 w-full">
              <vue-slider
                :value="
                  shoppingDataEntry[subSection] > 1000
                    ? 1000
                    : shoppingDataEntry[subSection]
                "
                :marks="marksResponsive"
                :min="min"
                :max="max[subSection]"
                :tooltip-placement="'top'"
                @change="setValue($event)"
              ></vue-slider>
            </div>
          </div>
          <div class="flex w-full gap-x-4 justify-center items-center">
            <h1 class="text-sm font-bold text-center mt-5">£</h1>
            <input
              :value="shoppingDataEntry[subSection]"
              class="mt-5 border rounded-md border-accent text-center"
              type="number"
              @input="setValueInput($event)"
            />
          </div>
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
            @click.prevent="submitShoppingData"
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
            @click.prevent="submitShoppingData"
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
      section: 'plastic',
      subSection: 'waterBottle',
      shoppingSwitchVal: true,
      uploadingImage: false,
      shopping: {
        waterBottle: 0,
      },
      min: 0,
      max: {
        // plastic products
        waterBottle: 1000,
        juice: 1000,
        softdrink: 1000,
        shampoo: 1000,
        plasticContainer: 1000,
        tvAndComputer: 1000,
        bags: 1000,
        carSpareParts: 1000,
        // non-plastic products
        books: 1000,
        tissuePaper: 1000,
        paper: 1000,
        medicine: 1000,
        dress: 1000,
        shoes: 1000,
        torso: 1000,
        trouser: 1000,
      },
      marks: {
        0: 'Low Consumption',
        500: 'Middle Consumption',
        1000: 'High Consumption',
      },
      marksResponsive: {
        0: 'Low',
        500: 'Average',
        1000: 'High',
      },
      shoppingData: [],
      shoppingDataEntry: {
        // plastic products
        waterBottle: 0,
        juice: 0,
        softdrink: 0,
        shampoo: 0,
        plasticContainer: 0,
        tvAndComputer: 0,
        bags: 0,
        carSpareParts: 0,
        // non-plastic products
        books: 0,
        tissuePaper: 0,
        paper: 0,
        medicine: 0,
        dress: 0,
        shoes: 0,
        torso: 0,
        trouser: 0,
        // plastic: 0,
        // textile: 0,
        // pharma: 0,
        image: null,
        measuredOn: new Date().toDateString(),
        status: 'pending',
        factors: {
          // plastic products
          waterBottle: 0.83,
          juice: 0.84,
          softdrink: 0.17,
          shampoo: 0.11,
          plasticContainer: 0.08,
          tvAndComputer: 0.1,
          bags: 1.58,
          carSpareParts: 1.7,
          // non-plastic products
          books: 2,
          tissuePaper: 1.9,
          paper: 0.028,
          medicine: 12,
          dress: 0.35,
          shoes: 0.35,
          torso: 0.35,
          trouser: 0.35,
          // paper: 1.18,
          // plastic: 0.96,
          // textile: 0.96,
          // pharma: 0.35,
        },
        finalEmissions: {
          // plastic products
          waterBottle: 0,
          juice: 0,
          softdrink: 0,
          shampoo: 0,
          plasticContainer: 0,
          tvAndComputer: 0,
          bags: 0,
          carSpareParts: 0,
          // non-plastic products
          books: 0,
          tissuePaper: 0,
          paper: 0,
          medicine: 0,
          dress: 0,
          shoes: 0,
          torso: 0,
          trouser: 0,
          // total
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
    if (this.$store.state.measure.shoppingData) {
      this.shoppingData = [...this.$store.state.measure.shoppingData]
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
      // if (!localStorage.getItem('showStatus')) {
      //   this.showModal = true
      // }
      this.addReceipt()
    },
    checkedTracker(value) {
      this.showAgain = value
    },
    setEntry(index) {
      this.selectedEntry = index
      this.shoppingDataEntry = { ...this.shoppingData[index] }
      this.primaryImageData = this.shoppingData[index].image
    },
    addReceipt() {
      if (this.selectedEntry === -1) {
        this.shoppingDataEntry.image = this.primaryImageData
        this.shoppingData.push({ ...this.shoppingDataEntry })
      } else {
        this.shoppingDataEntry.image = this.primaryImageData
        this.shoppingData[this.selectedEntry] = { ...this.shoppingDataEntry }
      }
      // plastic products
      this.shoppingDataEntry.waterBottle = 0
      this.shoppingDataEntry.juice = 0
      this.shoppingDataEntry.softdrink = 0
      this.shoppingDataEntry.shampoo = 0
      this.shoppingDataEntry.plasticContainer = 0
      this.shoppingDataEntry.tvAndComputer = 0
      this.shoppingDataEntry.bags = 0
      this.shoppingDataEntry.carSpareParts = 0
      // non-plastic products
      this.shoppingDataEntry.books = 0
      this.shoppingDataEntry.tissuePaper = 0
      this.shoppingDataEntry.paper = 0
      this.shoppingDataEntry.medicine = 0
      this.shoppingDataEntry.dress = 0
      this.shoppingDataEntry.shoes = 0
      this.shoppingDataEntry.torso = 0
      this.shoppingDataEntry.trouser = 0
      this.selectedEntry = -1
      this.primaryImageData = null
    },
    removeImage(index) {
      this.shoppingData = this.shoppingData.filter(
        (_data, index1) => index1 !== index
      )
      this.reset()
    },
    // uploads multiple images
    async uploadImages() {
      const promises = []
      this.shoppingData.forEach(async (data, index) => {
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
      this.shoppingDataEntry[this.subSection] = parseInt(value)
    },
    setValueInput(e) {
      this.shoppingDataEntry[this.subSection] = parseInt(e.target.value)
    },
    shoppingSwitch(event) {
      this.shoppingSwitchVal = event.target.checked
    },
    async submitShoppingData() {
      this.$store.dispatch('loading/toggleLoading', true)
      this.addReceipt()
      await this.uploadImages()
      this.shoppingData.forEach((data, index) => {
        data.image = this.primaryImageRef[index]
      })
      this.reset()
      this.shoppingData.forEach((data) => {
        if (data.image === undefined) data.image = null
      })
      this.$store.dispatch('measure/setShoppingData', this.shoppingData)
      this.$emit('sectionSubmit')
      this.$store.dispatch('loading/toggleLoading', false)
    },

    // addEntry() {

    // },

    removeEntry(i) {
      this.shoppingData.splice(i, 1)
    },

    clearShoppingDataEntry() {
      this.shoppingDataEntry = {
        // plastic products
        waterBottle: 0,
        juice: 0,
        softdrink: 0,
        shampoo: 0,
        plasticContainer: 0,
        tvAndComputer: 0,
        bags: 0,
        carSpareParts: 0,
        // non-plastic products
        books: 0,
        tissuePaper: 0,
        paper: 0,
        medicine: 0,
        dress: 0,
        shoes: 0,
        torso: 0,
        trouser: 0,
        image: null,
        measuredOn: new Date().toDateString(),
        status: 'pending',
        factors: {
          // plastic products
          waterBottle: 0.83,
          juice: 0.84,
          softdrink: 0.17,
          shampoo: 0.11,
          plasticContainer: 0.08,
          tvAndComputer: 0.1,
          bags: 1.58,
          carSpareParts: 1.7,
          // non-plastic products
          books: 2,
          tissuePaper: 1.9,
          paper: 0.028,
          medicine: 0,
          dress: 0.35,
          shoes: 0.35,
          torso: 0.35,
          trouser: 0.35,
        },
        finalEmissions: {
          // plastic products
          waterBottle: 0,
          juice: 0,
          softdrink: 0,
          shampoo: 0,
          plasticContainer: 0,
          tvAndComputer: 0,
          bags: 0,
          carSpareParts: 0,
          // non-plastic products
          books: 0,
          tissuePaper: 0,
          paper: 0,
          medicine: 0,
          dress: 0,
          shoes: 0,
          torso: 0,
          trouser: 0,
        },
      }
    },
    reset() {
      // plastic products
      this.shoppingDataEntry.waterBottle = 0
      this.shoppingDataEntry.juice = 0
      this.shoppingDataEntry.softdrink = 0
      this.shoppingDataEntry.shampoo = 0
      this.shoppingDataEntry.plasticContainer = 0
      this.shoppingDataEntry.tvAndComputer = 0
      this.shoppingDataEntry.bags = 0
      this.shoppingDataEntry.carSpareParts = 0
      // non-plastic products
      this.shoppingDataEntry.books = 0
      this.shoppingDataEntry.tissuePaper = 0
      this.shoppingDataEntry.paper = 0
      this.shoppingDataEntry.medicine = 0
      this.shoppingDataEntry.dress = 0
      this.shoppingDataEntry.shoes = 0
      this.shoppingDataEntry.torso = 0
      this.shoppingDataEntry.trouser = 0
      this.selectedEntry = -1
      this.primaryImageData = null
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
        this.shoppingDataEntry.image = imageUrl

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
