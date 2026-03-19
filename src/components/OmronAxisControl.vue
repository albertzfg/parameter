<template>
  <div class="omron-axis-control">
    <div class="page-header">
      <h1>欧姆龙PLC 轴运动控制功能块封装</h1>
      <p class="subtitle">Omron NJ/NX Series — IEC 61131-3 PLCopen Motion Control Function Blocks</p>
    </div>

    <div class="main-layout">
      <!-- 左侧功能块列表 -->
      <aside class="sidebar">
        <h3>功能块列表</h3>
        <ul class="fb-list">
          <li
            v-for="fb in functionBlocks"
            :key="fb.name"
            :class="{ active: selectedFB && selectedFB.name === fb.name }"
            @click="selectFB(fb)"
          >
            <span class="fb-name">{{ fb.name }}</span>
            <span class="fb-desc">{{ fb.chineseName }}</span>
          </li>
        </ul>
      </aside>

      <!-- 右侧参数表 -->
      <main class="content">
        <div v-if="!selectedFB" class="placeholder">
          <p>← 请从左侧选择一个功能块查看参数</p>
        </div>

        <div v-else class="fb-detail">
          <div class="fb-title">
            <h2>{{ selectedFB.name }}</h2>
            <span class="fb-chinese-name">{{ selectedFB.chineseName }}</span>
          </div>
          <p class="fb-description">{{ selectedFB.description }}</p>

          <!-- 输入参数 -->
          <h3 class="section-title">输入参数 (Input)</h3>
          <table class="param-table">
            <thead>
              <tr>
                <th>参数名</th>
                <th>数据类型</th>
                <th>描述</th>
                <th>默认值</th>
                <th>范围</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="param in selectedFB.inputs" :key="param.name">
                <td class="param-name">{{ param.name }}</td>
                <td class="param-type">{{ param.type }}</td>
                <td>{{ param.description }}</td>
                <td class="param-default">{{ param.defaultValue !== undefined ? param.defaultValue : '—' }}</td>
                <td class="param-range">{{ param.range || '—' }}</td>
              </tr>
            </tbody>
          </table>

          <!-- 输出参数 -->
          <h3 class="section-title">输出参数 (Output)</h3>
          <table class="param-table">
            <thead>
              <tr>
                <th>参数名</th>
                <th>数据类型</th>
                <th>描述</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="param in selectedFB.outputs" :key="param.name">
                <td class="param-name">{{ param.name }}</td>
                <td class="param-type">{{ param.type }}</td>
                <td>{{ param.description }}</td>
              </tr>
            </tbody>
          </table>

          <!-- 使用说明 -->
          <div v-if="selectedFB.notes" class="notes">
            <h3 class="section-title">使用说明</h3>
            <ul>
              <li v-for="(note, idx) in selectedFB.notes" :key="idx">{{ note }}</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OmronAxisControl',
  data () {
    return {
      selectedFB: null,
      functionBlocks: [
        {
          name: 'MC_Power',
          chineseName: '轴使能',
          description: '使能或禁止轴的运动控制。使能后轴进入就绪状态，可以执行运动指令。',
          inputs: [
            { name: 'Axis', type: 'AXIS_REF', description: '轴变量引用', defaultValue: undefined },
            { name: 'Enable', type: 'BOOL', description: '使能信号（上升沿有效）', defaultValue: false },
            { name: 'EnablePositive', type: 'BOOL', description: '允许正方向运动', defaultValue: true },
            { name: 'EnableNegative', type: 'BOOL', description: '允许负方向运动', defaultValue: true }
          ],
          outputs: [
            { name: 'Status', type: 'BOOL', description: '轴已使能状态' },
            { name: 'Busy', type: 'BOOL', description: '功能块正在执行' },
            { name: 'Error', type: 'BOOL', description: '发生错误' },
            { name: 'ErrorID', type: 'WORD', description: '错误代码' }
          ],
          notes: [
            'Enable 为 TRUE 时轴处于使能状态，为 FALSE 时禁止轴运动。',
            '轴使能后伺服驱动器上电，电机处于受控状态。',
            '执行其他运动功能块前必须先执行 MC_Power。'
          ]
        },
        {
          name: 'MC_Home',
          chineseName: '回原点',
          description: '执行轴的回原点操作，将轴移动到机械原点位置并建立坐标系。',
          inputs: [
            { name: 'Axis', type: 'AXIS_REF', description: '轴变量引用' },
            { name: 'Execute', type: 'BOOL', description: '执行信号（上升沿触发）', defaultValue: false },
            { name: 'Position', type: 'LREAL', description: '回原点完成后的坐标值', defaultValue: 0.0, range: '—' },
            { name: 'HomingMode', type: 'MC_HOMINGMODE', description: '回原点模式', defaultValue: 0 }
          ],
          outputs: [
            { name: 'Done', type: 'BOOL', description: '回原点完成' },
            { name: 'Busy', type: 'BOOL', description: '功能块正在执行' },
            { name: 'CommandAborted', type: 'BOOL', description: '指令被中止' },
            { name: 'Error', type: 'BOOL', description: '发生错误' },
            { name: 'ErrorID', type: 'WORD', description: '错误代码' }
          ],
          notes: [
            'Execute 上升沿触发回原点动作。',
            'Done 为 TRUE 表示回原点成功完成。',
            '回原点模式需根据实际传感器配置选择。'
          ]
        },
        {
          name: 'MC_MoveAbsolute',
          chineseName: '绝对位置运动',
          description: '命令轴移动到指定绝对位置，运动时使用设定的速度、加速度和减速度。',
          inputs: [
            { name: 'Axis', type: 'AXIS_REF', description: '轴变量引用' },
            { name: 'Execute', type: 'BOOL', description: '执行信号（上升沿触发）', defaultValue: false },
            { name: 'Position', type: 'LREAL', description: '目标绝对位置', defaultValue: 0.0, range: '依据轴配置' },
            { name: 'Velocity', type: 'LREAL', description: '运动速度', defaultValue: 100.0, range: '> 0' },
            { name: 'Acceleration', type: 'LREAL', description: '加速度', defaultValue: 1000.0, range: '≥ 0' },
            { name: 'Deceleration', type: 'LREAL', description: '减速度', defaultValue: 1000.0, range: '≥ 0' },
            { name: 'Jerk', type: 'LREAL', description: '加加速度（S曲线）', defaultValue: 0.0, range: '≥ 0' },
            { name: 'Direction', type: 'MC_DIRECTION', description: '运动方向（0:正向 1:负向 2:最短路径）', defaultValue: 0 },
            { name: 'BufferMode', type: 'MC_BUFFERMODE', description: '缓冲模式', defaultValue: 0 }
          ],
          outputs: [
            { name: 'Done', type: 'BOOL', description: '运动完成，到达目标位置' },
            { name: 'Busy', type: 'BOOL', description: '功能块正在执行' },
            { name: 'Active', type: 'BOOL', description: '功能块正在控制轴' },
            { name: 'CommandAborted', type: 'BOOL', description: '指令被中止' },
            { name: 'Error', type: 'BOOL', description: '发生错误' },
            { name: 'ErrorID', type: 'WORD', description: '错误代码' }
          ],
          notes: [
            '执行前需确保轴已使能（MC_Power.Status = TRUE）。',
            'Execute 上升沿触发运动，Done 为 TRUE 表示到达目标位置。',
            'Jerk = 0 时使用梯形速度曲线；Jerk > 0 时使用 S 曲线。'
          ]
        },
        {
          name: 'MC_MoveRelative',
          chineseName: '相对位置运动',
          description: '命令轴从当前位置移动指定距离，运动时使用设定的速度、加速度和减速度。',
          inputs: [
            { name: 'Axis', type: 'AXIS_REF', description: '轴变量引用' },
            { name: 'Execute', type: 'BOOL', description: '执行信号（上升沿触发）', defaultValue: false },
            { name: 'Distance', type: 'LREAL', description: '相对移动距离（正值正向，负值负向）', defaultValue: 0.0 },
            { name: 'Velocity', type: 'LREAL', description: '运动速度', defaultValue: 100.0, range: '> 0' },
            { name: 'Acceleration', type: 'LREAL', description: '加速度', defaultValue: 1000.0, range: '≥ 0' },
            { name: 'Deceleration', type: 'LREAL', description: '减速度', defaultValue: 1000.0, range: '≥ 0' },
            { name: 'Jerk', type: 'LREAL', description: '加加速度（S曲线）', defaultValue: 0.0, range: '≥ 0' },
            { name: 'BufferMode', type: 'MC_BUFFERMODE', description: '缓冲模式', defaultValue: 0 }
          ],
          outputs: [
            { name: 'Done', type: 'BOOL', description: '运动完成，已移动指定距离' },
            { name: 'Busy', type: 'BOOL', description: '功能块正在执行' },
            { name: 'Active', type: 'BOOL', description: '功能块正在控制轴' },
            { name: 'CommandAborted', type: 'BOOL', description: '指令被中止' },
            { name: 'Error', type: 'BOOL', description: '发生错误' },
            { name: 'ErrorID', type: 'WORD', description: '错误代码' }
          ],
          notes: [
            'Distance 为正值时轴正向移动，为负值时负向移动。',
            '每次 Execute 上升沿触发一次相对运动。',
            '支持运动叠加，可在运动中途修改 Distance 并重新触发。'
          ]
        },
        {
          name: 'MC_MoveVelocity',
          chineseName: '速度运动',
          description: '命令轴以指定速度持续运动，直到收到停止指令。',
          inputs: [
            { name: 'Axis', type: 'AXIS_REF', description: '轴变量引用' },
            { name: 'Execute', type: 'BOOL', description: '执行信号（上升沿触发）', defaultValue: false },
            { name: 'Velocity', type: 'LREAL', description: '运动速度（正值正向，负值负向）', defaultValue: 100.0 },
            { name: 'Acceleration', type: 'LREAL', description: '加速度', defaultValue: 1000.0, range: '≥ 0' },
            { name: 'Deceleration', type: 'LREAL', description: '减速度', defaultValue: 1000.0, range: '≥ 0' },
            { name: 'Jerk', type: 'LREAL', description: '加加速度（S曲线）', defaultValue: 0.0, range: '≥ 0' },
            { name: 'Direction', type: 'MC_DIRECTION', description: '运动方向', defaultValue: 0 },
            { name: 'BufferMode', type: 'MC_BUFFERMODE', description: '缓冲模式', defaultValue: 0 }
          ],
          outputs: [
            { name: 'InVelocity', type: 'BOOL', description: '轴已达到设定速度' },
            { name: 'Busy', type: 'BOOL', description: '功能块正在执行' },
            { name: 'Active', type: 'BOOL', description: '功能块正在控制轴' },
            { name: 'CommandAborted', type: 'BOOL', description: '指令被中止' },
            { name: 'Error', type: 'BOOL', description: '发生错误' },
            { name: 'ErrorID', type: 'WORD', description: '错误代码' }
          ],
          notes: [
            '速度运动无目标位置，轴持续以设定速度运动。',
            '需通过 MC_Stop 或 MC_Halt 停止速度运动。',
            'InVelocity 为 TRUE 表示已达到目标速度。'
          ]
        },
        {
          name: 'MC_MoveAdditive',
          chineseName: '叠加运动',
          description: '在当前运动目标位置的基础上叠加一个附加距离，实现运动叠加。',
          inputs: [
            { name: 'Axis', type: 'AXIS_REF', description: '轴变量引用' },
            { name: 'Execute', type: 'BOOL', description: '执行信号（上升沿触发）', defaultValue: false },
            { name: 'Distance', type: 'LREAL', description: '附加距离', defaultValue: 0.0 },
            { name: 'Velocity', type: 'LREAL', description: '运动速度', defaultValue: 100.0, range: '> 0' },
            { name: 'Acceleration', type: 'LREAL', description: '加速度', defaultValue: 1000.0, range: '≥ 0' },
            { name: 'Deceleration', type: 'LREAL', description: '减速度', defaultValue: 1000.0, range: '≥ 0' },
            { name: 'Jerk', type: 'LREAL', description: '加加速度', defaultValue: 0.0, range: '≥ 0' },
            { name: 'BufferMode', type: 'MC_BUFFERMODE', description: '缓冲模式', defaultValue: 0 }
          ],
          outputs: [
            { name: 'Done', type: 'BOOL', description: '运动完成' },
            { name: 'Busy', type: 'BOOL', description: '功能块正在执行' },
            { name: 'Active', type: 'BOOL', description: '功能块正在控制轴' },
            { name: 'CommandAborted', type: 'BOOL', description: '指令被中止' },
            { name: 'Error', type: 'BOOL', description: '发生错误' },
            { name: 'ErrorID', type: 'WORD', description: '错误代码' }
          ],
          notes: [
            '仅在轴处于运动状态时有效，用于叠加额外的移动距离。',
            '叠加距离与当前运动目标相加形成新目标位置。'
          ]
        },
        {
          name: 'MC_Stop',
          chineseName: '停止运动',
          description: '以设定的减速度使轴平滑减速停止，并使轴进入停止状态（锁定）。',
          inputs: [
            { name: 'Axis', type: 'AXIS_REF', description: '轴变量引用' },
            { name: 'Execute', type: 'BOOL', description: '执行信号（高电平有效，保持 TRUE 直到 Done）', defaultValue: false },
            { name: 'Deceleration', type: 'LREAL', description: '减速度', defaultValue: 1000.0, range: '≥ 0' },
            { name: 'Jerk', type: 'LREAL', description: '加加速度', defaultValue: 0.0, range: '≥ 0' }
          ],
          outputs: [
            { name: 'Done', type: 'BOOL', description: '轴已停止' },
            { name: 'Busy', type: 'BOOL', description: '功能块正在执行' },
            { name: 'CommandAborted', type: 'BOOL', description: '指令被中止' },
            { name: 'Error', type: 'BOOL', description: '发生错误' },
            { name: 'ErrorID', type: 'WORD', description: '错误代码' }
          ],
          notes: [
            'Execute 需保持 TRUE 直到 Done 变为 TRUE，否则将中止停止操作。',
            '停止完成后轴进入 StandStill 状态，需重新发送运动指令。',
            'MC_Stop 优先级高于其他运动功能块。'
          ]
        },
        {
          name: 'MC_Halt',
          chineseName: '暂停运动',
          description: '以设定的减速度使轴平滑减速停止，停止后轴仍可接受新的运动指令。',
          inputs: [
            { name: 'Axis', type: 'AXIS_REF', description: '轴变量引用' },
            { name: 'Execute', type: 'BOOL', description: '执行信号（上升沿触发）', defaultValue: false },
            { name: 'Deceleration', type: 'LREAL', description: '减速度', defaultValue: 1000.0, range: '≥ 0' },
            { name: 'Jerk', type: 'LREAL', description: '加加速度', defaultValue: 0.0, range: '≥ 0' },
            { name: 'BufferMode', type: 'MC_BUFFERMODE', description: '缓冲模式', defaultValue: 0 }
          ],
          outputs: [
            { name: 'Done', type: 'BOOL', description: '轴已停止' },
            { name: 'Busy', type: 'BOOL', description: '功能块正在执行' },
            { name: 'Active', type: 'BOOL', description: '功能块正在控制轴' },
            { name: 'CommandAborted', type: 'BOOL', description: '指令被中止' },
            { name: 'Error', type: 'BOOL', description: '发生错误' },
            { name: 'ErrorID', type: 'WORD', description: '错误代码' }
          ],
          notes: [
            'MC_Halt 与 MC_Stop 的区别：Halt 停止后可直接发送新运动指令，Stop 停止后需先发新指令才能解除锁定。',
            'Execute 上升沿触发一次暂停动作。'
          ]
        },
        {
          name: 'MC_Reset',
          chineseName: '错误复位',
          description: '复位轴的错误状态，使轴从 ErrorStop 状态恢复到 StandStill 状态。',
          inputs: [
            { name: 'Axis', type: 'AXIS_REF', description: '轴变量引用' },
            { name: 'Execute', type: 'BOOL', description: '执行信号（上升沿触发）', defaultValue: false }
          ],
          outputs: [
            { name: 'Done', type: 'BOOL', description: '复位完成' },
            { name: 'Busy', type: 'BOOL', description: '功能块正在执行' },
            { name: 'Error', type: 'BOOL', description: '发生错误' },
            { name: 'ErrorID', type: 'WORD', description: '错误代码' }
          ],
          notes: [
            '轴进入 ErrorStop 状态后，必须先排除故障原因再执行 MC_Reset。',
            '复位成功后轴进入 StandStill 状态，可以重新执行运动指令。'
          ]
        },
        {
          name: 'MC_ReadActualPosition',
          chineseName: '读取实际位置',
          description: '连续读取轴的当前实际位置（编码器反馈值）。',
          inputs: [
            { name: 'Axis', type: 'AXIS_REF', description: '轴变量引用' },
            { name: 'Enable', type: 'BOOL', description: '使能信号（高电平持续读取）', defaultValue: false }
          ],
          outputs: [
            { name: 'Valid', type: 'BOOL', description: '输出数据有效' },
            { name: 'Busy', type: 'BOOL', description: '功能块正在执行' },
            { name: 'Error', type: 'BOOL', description: '发生错误' },
            { name: 'ErrorID', type: 'WORD', description: '错误代码' },
            { name: 'Position', type: 'LREAL', description: '轴的实际位置值' }
          ],
          notes: [
            'Enable 为 TRUE 时持续输出当前位置，Valid 为 TRUE 时数据有效。',
            '读取的是编码器的实际反馈位置，不是命令位置。'
          ]
        },
        {
          name: 'MC_ReadActualVelocity',
          chineseName: '读取实际速度',
          description: '连续读取轴的当前实际速度。',
          inputs: [
            { name: 'Axis', type: 'AXIS_REF', description: '轴变量引用' },
            { name: 'Enable', type: 'BOOL', description: '使能信号（高电平持续读取）', defaultValue: false }
          ],
          outputs: [
            { name: 'Valid', type: 'BOOL', description: '输出数据有效' },
            { name: 'Busy', type: 'BOOL', description: '功能块正在执行' },
            { name: 'Error', type: 'BOOL', description: '发生错误' },
            { name: 'ErrorID', type: 'WORD', description: '错误代码' },
            { name: 'Velocity', type: 'LREAL', description: '轴的实际速度值' }
          ],
          notes: [
            'Enable 为 TRUE 时持续输出当前速度，Valid 为 TRUE 时数据有效。'
          ]
        },
        {
          name: 'MC_ReadStatus',
          chineseName: '读取轴状态',
          description: '连续读取轴的当前状态信息（PLCopen 轴状态机中的各状态标志）。',
          inputs: [
            { name: 'Axis', type: 'AXIS_REF', description: '轴变量引用' },
            { name: 'Enable', type: 'BOOL', description: '使能信号（高电平持续读取）', defaultValue: false }
          ],
          outputs: [
            { name: 'Valid', type: 'BOOL', description: '输出数据有效' },
            { name: 'Busy', type: 'BOOL', description: '功能块正在执行' },
            { name: 'Error', type: 'BOOL', description: '发生错误' },
            { name: 'ErrorID', type: 'WORD', description: '错误代码' },
            { name: 'ErrorStop', type: 'BOOL', description: '轴处于错误停止状态' },
            { name: 'Disabled', type: 'BOOL', description: '轴处于禁止状态（未使能）' },
            { name: 'Stopping', type: 'BOOL', description: '轴正在执行 MC_Stop' },
            { name: 'Homing', type: 'BOOL', description: '轴正在回原点' },
            { name: 'StandStill', type: 'BOOL', description: '轴已停止（使能状态）' },
            { name: 'DiscreteMotion', type: 'BOOL', description: '轴正在执行位置运动' },
            { name: 'ContinuousMotion', type: 'BOOL', description: '轴正在执行速度运动' },
            { name: 'SynchronizedMotion', type: 'BOOL', description: '轴正在执行同步运动' }
          ],
          notes: [
            'PLCopen 轴状态机定义了轴在不同情况下的状态，各状态互斥。',
            'Enable 持续为 TRUE 时实时更新所有状态输出。'
          ]
        },
        {
          name: 'MC_ReadAxisError',
          chineseName: '读取轴错误',
          description: '读取轴的当前错误代码及错误详细信息。',
          inputs: [
            { name: 'Axis', type: 'AXIS_REF', description: '轴变量引用' },
            { name: 'Enable', type: 'BOOL', description: '使能信号（高电平持续读取）', defaultValue: false }
          ],
          outputs: [
            { name: 'Valid', type: 'BOOL', description: '输出数据有效' },
            { name: 'Busy', type: 'BOOL', description: '功能块正在执行' },
            { name: 'Error', type: 'BOOL', description: '发生错误' },
            { name: 'ErrorID', type: 'WORD', description: '错误代码' },
            { name: 'AxisErrorID', type: 'WORD', description: '轴的错误代码' }
          ],
          notes: [
            'AxisErrorID 返回驱动器或轴控制器报告的错误代码。',
            '根据错误代码查阅欧姆龙手册排查故障。'
          ]
        },
        {
          name: 'MC_SetPosition',
          chineseName: '设置位置',
          description: '将轴的当前位置重新设置为指定值（不产生物理运动），用于坐标重设。',
          inputs: [
            { name: 'Axis', type: 'AXIS_REF', description: '轴变量引用' },
            { name: 'Execute', type: 'BOOL', description: '执行信号（上升沿触发）', defaultValue: false },
            { name: 'Position', type: 'LREAL', description: '新的位置设定值', defaultValue: 0.0 },
            { name: 'Mode', type: 'BOOL', description: '设置模式（FALSE:绝对值设置 TRUE:相对值叠加）', defaultValue: false }
          ],
          outputs: [
            { name: 'Done', type: 'BOOL', description: '设置完成' },
            { name: 'Busy', type: 'BOOL', description: '功能块正在执行' },
            { name: 'Error', type: 'BOOL', description: '发生错误' },
            { name: 'ErrorID', type: 'WORD', description: '错误代码' }
          ],
          notes: [
            '该功能块仅修改位置计数值，不产生实际电机运动。',
            '通常用于定义工件坐标系或清零当前位置。',
            '在轴 StandStill 状态下执行更安全。'
          ]
        },
        {
          name: 'MC_SetOverride',
          chineseName: '速度倍率覆盖',
          description: '实时修改轴运动的速度倍率、加速度倍率和减速度倍率。',
          inputs: [
            { name: 'Axis', type: 'AXIS_REF', description: '轴变量引用' },
            { name: 'Enable', type: 'BOOL', description: '使能信号（高电平有效）', defaultValue: false },
            { name: 'VelFactor', type: 'LREAL', description: '速度倍率 (0.0~1.0)', defaultValue: 1.0, range: '0.0 ~ 1.0' },
            { name: 'AccFactor', type: 'LREAL', description: '加速度倍率 (0.0~1.0)', defaultValue: 1.0, range: '0.0 ~ 1.0' },
            { name: 'DecFactor', type: 'LREAL', description: '减速度倍率 (0.0~1.0)', defaultValue: 1.0, range: '0.0 ~ 1.0' }
          ],
          outputs: [
            { name: 'Enabled', type: 'BOOL', description: '倍率覆盖已生效' },
            { name: 'Busy', type: 'BOOL', description: '功能块正在执行' },
            { name: 'Error', type: 'BOOL', description: '发生错误' },
            { name: 'ErrorID', type: 'WORD', description: '错误代码' }
          ],
          notes: [
            'VelFactor = 1.0 时速度不变，= 0.5 时速度减半。',
            '倍率修改实时生效，可在运动过程中动态调整。',
            '常用于手动操作模式下的速度限制。'
          ]
        }
      ]
    }
  },
  methods: {
    selectFB (fb) {
      this.selectedFB = fb
    }
  }
}
</script>

<style scoped>
.omron-axis-control {
  font-family: 'Microsoft YaHei', 'PingFang SC', Arial, sans-serif;
  min-height: 100vh;
  background: #f4f6f9;
}

.page-header {
  background: linear-gradient(135deg, #c62828, #e53935);
  color: #fff;
  padding: 24px 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.page-header h1 {
  margin: 0 0 6px;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1px;
}

.subtitle {
  margin: 0;
  font-size: 13px;
  opacity: 0.85;
}

.main-layout {
  display: flex;
  min-height: calc(100vh - 90px);
}

/* ===== Sidebar ===== */
.sidebar {
  width: 220px;
  min-width: 220px;
  background: #fff;
  border-right: 1px solid #e0e0e0;
  padding: 16px 0;
}

.sidebar h3 {
  font-size: 13px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0 16px 10px;
  margin: 0;
  border-bottom: 1px solid #f0f0f0;
}

.fb-list {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
}

.fb-list li {
  padding: 10px 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-left: 3px solid transparent;
  transition: background 0.15s, border-color 0.15s;
}

.fb-list li:hover {
  background: #fce4e4;
  border-left-color: #e53935;
}

.fb-list li.active {
  background: #ffebee;
  border-left-color: #c62828;
}

.fb-name {
  font-size: 13px;
  font-weight: 600;
  color: #212121;
}

.fb-desc {
  font-size: 11px;
  color: #888;
  margin-top: 2px;
}

/* ===== Content ===== */
.content {
  flex: 1;
  padding: 24px 32px;
  overflow-x: auto;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #aaa;
  font-size: 16px;
}

.fb-detail {
  max-width: 900px;
}

.fb-title {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 8px;
}

.fb-title h2 {
  margin: 0;
  font-size: 22px;
  color: #c62828;
}

.fb-chinese-name {
  font-size: 16px;
  color: #555;
}

.fb-description {
  color: #555;
  font-size: 14px;
  margin: 0 0 20px;
  line-height: 1.6;
}

.section-title {
  font-size: 14px;
  color: #333;
  font-weight: 600;
  margin: 20px 0 10px;
  padding-bottom: 6px;
  border-bottom: 2px solid #e53935;
}

/* ===== Parameter Table ===== */
.param-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin-bottom: 8px;
}

.param-table th {
  background: #c62828;
  color: #fff;
  padding: 10px 12px;
  text-align: left;
  font-weight: 500;
}

.param-table td {
  padding: 9px 12px;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
}

.param-table tr:nth-child(even) td {
  background: #fafafa;
}

.param-table tr:hover td {
  background: #fff3e0;
}

.param-name {
  font-weight: 600;
  color: #1a237e;
  font-family: 'Consolas', 'Courier New', monospace;
  white-space: nowrap;
}

.param-type {
  color: #00695c;
  font-family: 'Consolas', 'Courier New', monospace;
  white-space: nowrap;
}

.param-default {
  color: #6a1a6a;
  font-family: 'Consolas', 'Courier New', monospace;
}

.param-range {
  font-size: 12px;
  color: #777;
}

/* ===== Notes ===== */
.notes ul {
  margin: 0;
  padding-left: 20px;
}

.notes li {
  font-size: 13px;
  color: #555;
  line-height: 1.7;
}
</style>
